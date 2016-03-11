import React, { Component } from 'react';
import CommandService from 'services/commands';
import SpeechInput from 'components/SpeechInput';
import CommandList from 'components/CommandList';
import Header from './Header';

export default class Dashboard extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { commands: [] };
    this.invoke = (message) => this.socket.invoke({ message });
    this.catchError = (e) => this.socket.catchError(e);
  }

  componentDidMount () {
    this.socket = new CommandService();
    this.socket.listen(commands => this.setState({ commands }));
  }

  reset (e) {
    e.preventDefault();
    this.socket.reset();
  }

  render () {
    return (
      <div>
        <Header>
          <SpeechInput onChange={ ::this.invoke } onError={ ::this.catchError } />
        </Header>
        <CommandList commands={ this.state.commands } reset={ ::this.reset } />
      </div>
    );
  }
}
