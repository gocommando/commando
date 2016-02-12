import axios from 'axios';
import io from 'socket.io-client';
import { start as startServer } from '../../server';

const PORT = process.env.PORT || 3333;
const URL = `http://localhost:${PORT}`;

let server;

export function start (done) {
  server = startServer(PORT, done);
}

export function stop (done) {
  server.close(done);
}

export function api (path) {
  return `${URL}/api${path}`;
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

export function connectSocket () {
  this.socket = io(URL);
}

export function disconnectSocket () {
  this.socket.disconnect();
}
