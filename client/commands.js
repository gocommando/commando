import Repeat from 'commando-repeat/Repeat';
import Reminder from '../commands/client/Reminder';
import Speak from '../commands/client/Speak';
import Weather from '../commands/client/Weather';
import YouTube from '../commands/client/YouTube';

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
