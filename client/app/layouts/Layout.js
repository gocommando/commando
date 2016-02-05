import axios from 'axios';
import React, { Component } from 'react';
import SpeechInput from '../components/SpeechInput';
import CommandList from '../components/CommandList';
import { uniqueId, extend } from 'lodash';

export default class Layout extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { commands: [] };
  }

  pushCommand (command) {
    this.setState({
      commands: [
        extend({id: uniqueId()}, command),
        ...this.state.commands
      ]
    });
  }

  async handleChange (message) {
    let url = '/api/commands/recognize/';
    url += encodeURIComponent(message);

    try {
      let { data } = await axios.post(url);
      this.pushCommand({ message, response: data });
    } catch (err) {
      if (err.data) {
        this.pushCommand({ message, error: err.data });
      } else {
        throw err;
      }
    }
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
