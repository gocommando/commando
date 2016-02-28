export default {
  name: 'Speak',
  component: 'Speak',

  pattern: /say (.+)/i,

  example: 'Say "hi"',

  properties: [
    { name: 'message' }
  ],

  invoke (action, callback) {
    callback(null, action);
  }
};
