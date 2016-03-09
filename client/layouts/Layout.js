import React, { Component } from 'react';
import SpeechInput from 'components/SpeechInput';
import CommandList from 'components/CommandList';
import Header from './Header';
import { uniqueId, extend } from 'lodash';
import io from 'socket.io-client';

export default class Layout extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { commands: [] };
    this.socket = io();
  }

  componentDidMount () {
    this.socket.on('command:error', ({ message, data }) => {
      this.pushCommand({ message, error: data });
    });

    this.socket.on('command:success', ({ message, data }) => {
      this.pushCommand({ message, response: data });
    });
  }

  pushCommand (command) {
    this.setState({
      commands: [
        extend({id: uniqueId()}, command),
        ...this.state.commands
      ]
    });
  }

  handleChange (message) {
    this.socket.emit('command:invoke', { message });
  }

  render () {
    return (
      <div>
        <section className='hero is-primary'>
          <Header />

          <div className='hero-content'>
            <div className='container'>
              <SpeechInput onChange={ this.handleChange.bind(this) } />
            </div>
          </div>
        </section>

        <CommandList commands={ this.state.commands } />
      </div>
    );
  }
}
