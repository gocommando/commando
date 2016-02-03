import axios from 'axios';
import React, { Component } from 'react';
import SpeechInput from '../components/SpeechInput';
import CommandList from '../components/CommandList';

export default class Layout extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { commands: [] };
  }

  pushCommand (newCommand) {
    this.setState({ commands: [ newCommand, ...this.state.commands ] });
  }

  handleChange (message) {
    let url = '/api/commands/recognize/';
    url += encodeURIComponent(message);

    axios.post(url).then(({data}) => {
      this.pushCommand({ message, response: data });
    }).catch(({data}) => {
      this.pushCommand({ message, error: data });
    });
  }

  render () {
    return (
      <div>
        <section className='hero is-primary is-medium'>
          <div className='hero-header'>
            <header className='header'>
              <div className='container'>
                <div className='header-left'>
                  <a className='header-item title' href='#'>
                    Commando
                  </a>
                </div>
                <span className='header-toggle'>
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </header>
          </div>

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
