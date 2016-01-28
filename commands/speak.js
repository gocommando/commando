export default {
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
};
