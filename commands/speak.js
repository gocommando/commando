import { register } from '../lib/commando';

export default register({
  name: 'Speak',

  pattern: /my name is (.+)/i,

  properties: [
    { name: 'name' }
  ],

  invoke (action) {
    return {
      reply: `Hello, ${action.name}. How's your mother?`
    };
  }
});
