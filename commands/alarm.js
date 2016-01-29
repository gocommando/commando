import { register } from '../lib/commando';

export default register({
  name: 'Alarm',

  pattern: /wake me up at (.+)/,

  properties: [
    { name: 'time', type: 'date' }
  ],

  invoke: function (action) {
    console.log(`You better wake me up at ${action.time}!`);
  }
});
