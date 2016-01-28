import path from 'path';
import glob from 'glob';
import { build } from './command';

const loadPath = path.resolve('commands/**/*.js');

const commands = glob.sync(loadPath).map(file => {
  return build(require(file));
});

export function serializeCommands () {
  return commands.map(cmd => cmd.toJSON());
};

export function findCommand (id) {
  return commands.find(cmd => cmd.id === id);
};

export function recognizeCommand (text) {
  return commands.find(cmd => cmd.recognize(text));
};
