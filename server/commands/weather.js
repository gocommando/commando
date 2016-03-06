export default {
  name: 'Weather',

  example: "What's the weather?",

  pattern: /weather/i,

  invoke (action, callback) {
    callback(null, {});
  }
};
