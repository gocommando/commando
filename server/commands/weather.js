module.exports = {
  name: 'Weather',

  component: 'Weather',

  pattern: /weather/i,

  invoke (action, callback) {
    callback(null, {});
  }
};
