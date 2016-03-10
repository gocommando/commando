import React, { Component } from 'react';
import CommandService from 'services/commands';
import SpeechInput from 'components/SpeechInput';
import CommandList from 'components/CommandList';
import Header from './Header';

const socket = new CommandService();
const invoke = (message) => socket.invoke({ message });

export default class Dashboard extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { commands: [] };
  }

  componentDidMount () {
    socket.listen(commands => this.setState({ commands }));
  }

  reset (e) {
    e.preventDefault();
    socket.reset();
  }

  render () {
    return (
      <div>
        <Header>
          <SpeechInput onChange={ invoke } onError={ ::socket.catchError } />
        </Header>
        <CommandList commands={ this.state.commands } reset={ ::this.reset } />
      </div>
    );
  }
}
