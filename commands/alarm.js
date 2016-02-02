module.exports = {
  name: 'Alarm',

  pattern: /wake me up at (.+)/,

  properties: [
    { name: 'time', type: 'date' }
  ],

  invoke: function (action, callback) {
    callback(null, {
      reply: `You better wake me up at ${action.time}!`
    });
  }
};
