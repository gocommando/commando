import { get } from 'axios';

function rotateThrough (data, callback) {
  let i = 0;

  callback(null, data[0].example);

  setInterval(() => {
    i++;
    let val = data[i % data.length];
    callback(null, val.example);
  }, 2000);
}

export default async function rotateExamples (callback) {
  try {
    let result = await get('/api/commands');
    rotateThrough(result.data, callback);
  } catch (e) {
    callback(e);
  }
}
