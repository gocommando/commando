import axios from 'axios';
import React, { Component } from 'react';
import SpeechInput from '../components/SpeechInput';

function renderCommand (response) {
  if (response && response.component) {
    let Command = require(`../commands/${response.component}`).default;
    return <Command { ...response } />;
  }
}

export default class Layout extends Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      response: undefined
    };
  }

  handleSpeech (message) {
    let url = '/api/commands/recognize/';
    url += encodeURIComponent(message);

    axios.post(url).then(({data}) => {
      this.setState({ response: data });
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
              <SpeechInput onChange={ this.handleSpeech.bind(this) } />
            </div>
          </div>
        </section>

        <section className='card-list'>
          <div className='container'>
            { renderCommand(this.state.response) }
          </div>
        </section>
      </div>
    );
  }
}
