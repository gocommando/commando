module.exports = {
  name: 'Speak',

  pattern: /my name is (.+)/i,

  properties: [
    { name: 'name' }
  ],

  invoke: function (action) {
    var reply = "Hello, " + action.name + ".";
    reply += " How's your mother?";
    return { reply: reply };
  }
};
