export default {
  name: 'Speak',

  pattern: /say (.+)/i,

  example: 'Say "hi"',

  properties: [
    { name: 'message' }
  ],

  invoke (action, callback) {
    callback(null, action);
  }
};
