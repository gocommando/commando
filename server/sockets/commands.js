import { extend } from 'lodash';
import { recognizeCommand } from '../lib/commando';

function emitError (client, message, errMsg) {
  client.emit('command:error', {
    message,
    data: { error: errMsg }
  });
}

export function invoke (client, { message }) {
  let command = recognizeCommand(message);

  if (!command) {
    emitError(client, message, "I didn't recognize that.");
    return;
  }

  command.invoke(command.extract(message), function (err, props) {
    if (err) {
      emitError(client, message, err.message);
    } else {
      client.emit('command:success', {
        message,
        data: extend(command.toJSON(), { props })
      });
    }
  });
}

export default function (client) {
  client.on('command:invoke', invoke.bind(null, client));
}
