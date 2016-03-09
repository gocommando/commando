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
    this.invoke = (message) => this.socket.invoke({ message });
  }

  componentDidMount () {
    this.socket.listen(commands => this.setState({ commands }));
  }

  reset (e) {
    e.preventDefault();
    this.socket.reset();
  }

  render () {
    return (
      <div>
        <section className='hero is-primary'>
          <Header />

          <div className='hero-content'>
            <div className='container'>
              <SpeechInput onChange={ this.invoke.bind(this) } />
            </div>
          </div>
        </section>

        <CommandList commands={ this.state.commands }
                     reset={ this.reset.bind(this) } />
      </div>
    );
  }
}
