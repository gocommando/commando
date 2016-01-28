export default {
  name: 'Alarm',

  pattern: /wake me up at (.+)/,

  properties: [
    { name: 'time', type: 'date' }
  ],

  invoke (action) {
    console.log(`You better wake me up at ${action.time}!`);
  }
};
