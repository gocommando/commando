import React, { Component } from 'react';
import CommandSocket from '../command-socket';
import SpeechInput from 'components/SpeechInput';
import CommandList from 'components/CommandList';
import Header from './Header';

export default class Layout extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { commands: [] };
    this.socket = new CommandSocket();
  }

  componentDidMount () {
    this.socket.onMessage(this.pushCommand.bind(this));
    this.setState({ commands: this.socket.savedCommands() });
  }

  pushCommand (command) {
    this.setState({ commands: [command, ...this.state.commands] });
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
