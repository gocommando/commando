import { paths } from '../../config';

export default {
  name: 'Weather',

  component: paths.client('commands/Weather'),

  example: "What's the weather?",

  pattern: /weather/i,

  invoke (action, callback) {
    callback(null, {});
  }
};
