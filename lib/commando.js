import { regex } from './intent';
export { tokens } from '../config';

export const commands = [];

export function register (obj) {
  return commands.push(regex(obj));
}

export function serializeCommands () {
  return commands.map(cmd => cmd.toJSON());
}

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
