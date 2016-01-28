module.exports = {
  name: 'Alarm',

  pattern: /wake me up at (.+)/,

  properties: [
    { name: 'time', type: 'date' }
  ],

  invoke: function (action) {
    console.log('You better wake up at ' + action.time + '!');
  }
};
