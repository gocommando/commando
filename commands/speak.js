module.exports = {
  name: 'Speak',

  pattern: /say (.+)/i,

  properties: [
    { name: 'message' }
  ],

  invoke (action, callback) {
    callback(null, {
      message: action.message,
      component: 'Speak'
    });
  }
};
