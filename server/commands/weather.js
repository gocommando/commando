export default {
  name: 'Weather',

  component: 'Weather',

  example: "What's the weather?",

  pattern: /weather/i,

  invoke (action, callback) {
    callback(null, {});
  }
};
