import {
  register,
  commands
} from 'commando';

export const fixtures = {
  dummy: {
    name: 'Blah',
    pattern: /foo (.*)/,
    component: '/fake/path',
    properties: [
      { name: 'keyword' }
    ],
    invoke (action, callback) {
      if (action.keyword === 'ERROR') {
        callback(new Error('Throw an error!'));
      } else {
        callback(null, {
          reply: action.keyword
        });
      }
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
