import axios from 'axios';
import app from '../../server/app';

const PORT = process.env.PORT || 3333;

let server;

export function start (done) {
  server = app.listen(PORT, done);
}

export function stop (done) {
  server.close(done);
}

export function api (path) {
  return `http://localhost:${PORT}/api${path}`;
}

export function request (method, url, options = {}) {
  options.method = method;

  if (typeof url === 'string') {
    options.url = api(url);
  }

  return axios(options);
}

export function get () {
  return request('get', ...arguments);
}

export function post () {
  return request('post', ...arguments);
}
