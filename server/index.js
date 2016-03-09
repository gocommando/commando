import http from 'http';
import socketio from 'socket.io';
import app from './app';
import commandsSocket from './sockets/commands';
import '../config/boot';

export function start (port, callback) {
  app.set('port', port);

  const server = http.createServer(app);
  socketio(server).on('connection', commandsSocket);

  server.listen(port, callback);
  return server;
}
