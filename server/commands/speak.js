export default {
  name: 'Speak',
  component: 'Speak',

  pattern: /say (.+)/i,

  properties: [
    { name: 'message' }
  ],

  invoke (action, callback) {
    callback(null, action);
  }
};
