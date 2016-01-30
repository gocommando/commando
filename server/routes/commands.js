import express from 'express';
import { serializeCommands } from '../../lib/commando';
import { find, recognize, invoke } from '../middleware/commands';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(serializeCommands());
});

router.get('/recognize/:q', recognize, (req, res) => {
  res.status(200).json(req.command.toJSON());
});

router.post('/recognize/:q', recognize, (req, res) => {
  invoke(req.command, req.command.extract(req.params.q), res);
});

router.get('/:intent', find, (req, res) => {
  res.json(req.command.toJSON());
});

router.post('/:intent', find, (req, res) => {
  invoke(req.command, req.body.action, res);
});

export default router;
