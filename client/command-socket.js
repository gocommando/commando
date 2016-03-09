import io from 'socket.io-client';
import { extend } from 'lodash';
import { create as createGuid } from 'guid';
import remove from 'lodash/fp/remove';
import EventEmitter from 'events';

function readFromStorage () {
  try {
    return JSON.parse(localStorage.getItem('commands')) || [];
  } catch (e) {
    // Possibly corrupted
    localStorage.removeItem('commands');
    return [];
  }
}

function writeToStorage (commands) {
  try {
    localStorage.setItem('commands', JSON.stringify(commands));
    return true;
  } catch (e) {
    return false;
  }
}

function identify(data) {
  return extend({ id: createGuid() }, data);
}

export default class CommandStore extends EventEmitter {
  constructor () {
    super();
    this.socket = io();
    this.commands = readFromStorage();
    this.invoke = this.socket.emit.bind(this.socket, 'command:invoke');
  }

  trigger (commands) {
    this.commands = commands;
    writeToStorage(commands);
    this.emit('change', commands);
  }

  listen (callback) {
    this.socket.on('command:error', this.handleError.bind(this));
    this.socket.on('command:success', this.handleSuccess.bind(this))
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
}
