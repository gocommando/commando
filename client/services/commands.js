import io from 'socket.io-client';
import { extend } from 'lodash';
import { v1 as generateId } from 'node-uuid';
import storage from './localstorage';
import EventEmitter from 'events';

function identify (data) {
  return extend({ id: generateId() }, data);
}

const store = storage('commands', []);

export default class CommandStore extends EventEmitter {
  constructor () {
    super();
    this.socket = io();
    this.commands = store.read().filter((c) => !c.error);
    this.invoke = this.socket.emit.bind(this.socket, 'command:invoke');
  }

  trigger (commands) {
    this.commands = commands;
    store.write(commands);
    this.emit('change', commands);
  }

  listen (callback) {
    this.socket.on('command:error', ::this.handleError);
    this.socket.on('command:success', ::this.handleSuccess);
    this.on('change', callback);
    this.emit('change', this.commands);
  }

  reset () {
    this.trigger([]);
  }

  save (command) {
    this.trigger([identify(command), ...this.commands]);
  }

  handleSuccess ({ message, data }) {
    this.save({ message, response: data });
  }

  handleError ({ message, data }) {
    this.save({ message, error: data });
  }

  catchError (error) {
    this.save({ error: { error: error.message } });
  }
}
