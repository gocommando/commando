import {
  register,
  commands
} from '../../lib/commando';

export const fixtures = {
  dummy: {
    name: 'Blah',
    pattern: /foo (.*)/,
    properties: [
      { name: 'keyword' }
    ],
    invoke () {
      return { a: 'b' };
    }
  },

  dummyJSON: {
    name: 'Blah',
    intent: 'blah',
    properties: [
      { name: 'keyword' }
    ]
  }
};

export function registerDummy () {
  register(fixtures.dummy);
};

export function resetCommands () {
  commands.length = 0;
};
