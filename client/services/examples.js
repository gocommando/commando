import { get } from 'axios';

let interval;

function rotateThrough (data, callback) {
  let i = 0;

  callback(null, data[0].example);

  interval = setInterval(() => {
    i++;
    let val = data[i % data.length];
    callback(null, val.example);
  }, 2000);
}

export async function rotateExamples (callback) {
  try {
    let examples = await get('/api/commands');
    return rotateThrough(examples.data, callback);
  } catch (e) {
    callback(e);
  }
}

export function stopExamples () {
  clearInterval(interval);
}
