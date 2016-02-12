import glob from 'glob';
import { regex } from './intent';

export const commands = [];

export function register (obj) {
  commands.push(regex(obj));
}

export function registerDirectory (path, errback) {
  glob(path, function (err, files) {
    if (err) return errback(err);

    files.forEach(function (file) {
      let mod = require(file);
      register(mod.default || mod);
    });
  });
}

export function serializeCommands () {
  return commands.map(cmd => cmd.toJSON());
};

export function findCommand (intent) {
  return commands.find(cmd =>
    cmd.intent === intent
  );
}

export function recognizeCommand (text) {
  return commands.find(cmd =>
    text.match(cmd.pattern)
  );
}
