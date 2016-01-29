import express from 'express';
import {
  findCommand,
  recognizeCommand,
  serializeCommands
} from '../../lib/commando';

const router = express.Router();

function notFound(res) {
  res.status(404).json({ error: 'Not Found' });
}

function find(req, res, next) {
  req.command = findCommand(req.params.intent);
  req.command ? next() : notFound(res);
}

function recognize(req, res, next) {
  req.command = recognizeCommand(req.params.q);
  req.command ? next() : notFound(res);
}

router.get('/', (req, res) => {
  res.json(serializeCommands());
});

router.get('/recognize/:q', recognize, (req, res) => {
  res.status(200).json(req.command.toJSON());
});

router.post('/recognize/:q', recognize, (req, res) => {
  const args = req.command.extract(req.params.q);
  const result = req.command.invoke(args);
  res.status(200).json(result);
});

router.get('/:intent', find, (req, res) => {
  res.json(req.command.toJSON());
});

router.post('/:intent', find, (req, res) => {
  req.command.invoke(req.params.action);
  res.status(200).end();
});

export default router;
