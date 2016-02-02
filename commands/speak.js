module.exports = {
  name: 'Speak',

  pattern: /my name is (.+)/i,

  properties: [
    { name: 'name' }
  ],

  invoke (action, callback) {
    callback(null, {
      reply: `Hello, ${action.name}. How's your mother?`
    });
  }
};
