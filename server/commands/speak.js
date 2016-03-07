import { paths } from 'config';

export default {
  name: 'Speak',

  component: paths.client('commands/Speak'),

  pattern: /say (.+)/i,

  example: 'Say "hi"',

  properties: [
    { name: 'message' }
  ],

  invoke (action, callback) {
    callback(null, action);
  }
};
