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
