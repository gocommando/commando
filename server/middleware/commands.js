import {
  findCommand,
  recognizeCommand
} from '../../lib/commando';

function notFound (res) {
  res.status(404).json({
    error: 'Not Found'
  });
}

export function find (req, res, next) {
  req.command = findCommand(req.params.intent);
  req.command ? next() : notFound(res);
}

export function recognize (req, res, next) {
  req.command = recognizeCommand(req.params.q);
  req.command ? next() : notFound(res);
}

export function invoke (command, action, res) {
  command.invoke(action, function (err, reply) {
    if (err) {
      res.status(400).json({error: err.message});
    } else {
      res.status(200).json(reply);
    }
  });
}
