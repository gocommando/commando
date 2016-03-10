import React, { Component } from 'react';
import CommandService from 'services/commands';
import SpeechInput from 'components/SpeechInput';
import CommandList from 'components/CommandList';
import Header from './Header';

export default class Layout extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { commands: [] };
    this.socket = new CommandService();
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
              <SpeechInput onChange={ ::this.invoke }
                           onError={ ::this.socket.catchError } />
            </div>
          </div>
        </section>

        <CommandList commands={ this.state.commands }
                     reset={ ::this.reset } />
      </div>
    );
  }
}
