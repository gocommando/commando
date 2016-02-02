import axios from 'axios';
import React, { Component } from 'react';
import SpeechInput from '../components/SpeechInput';
import Command from '../components/Command';

export default class Root extends Component {
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

  renderCommand () {
    if (!this.state.response) return;

    return (
      <Command { ...this.state.response } />
    );
  }

  render () {
    return (
      <div>
        <SpeechInput onChange={ this.handleSpeech.bind(this) } />
        { this.renderCommand() }
      </div>
    );
  }
}
