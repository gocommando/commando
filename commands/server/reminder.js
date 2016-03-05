import chrono from 'chrono-node';
import schedule from 'node-schedule';

const currentMonth = () => {
  return new Date().toLocaleString('en-US', { month: 'long' });
};

const buildTimeString = ({ preposition, time }) => {
  // Handle a scenario where the user says 'on the 13th'
  if (preposition === 'on' && time.match(/the/)) {
    return time.replace('the', currentMonth());
  } else {
    return `${preposition} ${time}`;
  }
};

export default {
  name: 'Reminder',

  component: 'Reminder',

  pattern: /remind me to (.+) (in|on|at) (.+)/i,

  example: 'Remind me to pick up the dry cleaning in 5 minutes',

  properties: [
    { name: 'reminder' },
    { name: 'preposition' },
    { name: 'time' }
  ],

  invoke (action, callback) {
    const time = chrono.parseDate(buildTimeString(action));

    if (!time) {
      return callback(new Error('Unable to recognize the time you provided'));
    }

    schedule.scheduleJob(time, () => {
      callback(null, { ...action, time, scheduled: false });
    });

    callback(null, { ...action, time, scheduled: true });
  }
};
