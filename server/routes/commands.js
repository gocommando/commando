import express from 'express';
import authenticate from '../middleware/authenticate';
import { serializeCommands } from 'commando';
import { find, recognize, invoke } from '../middleware/commands';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
  res.json(serializeCommands());
});

router.get('/recognize/:q', authenticate, recognize, (req, res) => {
  res.status(200).json(req.command.toJSON());
});

router.post('/recognize/:q', authenticate, recognize, (req, res) => {
  invoke(req.command, req.command.extract(req.params.q), res);
});

router.get('/:intent', authenticate, find, (req, res) => {
  res.json(req.command.toJSON());
});

router.post('/:intent', authenticate, find, (req, res) => {
  invoke(req.command, req.body.action, res);
});

export default router;
