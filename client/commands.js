import Repeat from 'commando-repeat/Repeat';
import Reminder from './commands/Reminder';
import Speak from './commands/Speak';
import Weather from './commands/Weather';
import YouTube from './commands/YouTube';

const components = {
  Repeat,
  Reminder,
  Speak,
  Weather,
  YouTube
};

export function find (name) {
  const component = components[name];

  if (!component) {
    throw new Error(`${name} has not been registered as a component. Check 'commands.js'.`);
  }

  return component;
}
