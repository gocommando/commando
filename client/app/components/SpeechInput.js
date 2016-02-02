import React, { Component, PropTypes } from 'react';

export default class SpeechInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context);
    this.state = {
      message: 'Click start and say something...'
    };
  }

  componentDidMount () {
    this.recognizer = new webkitSpeechRecognition();
    this.recognizer.lang = 'en';
    this.recognizer.onresult = this.handleSpeech.bind(this);
  }

  start () {
    this.recognizer.start();
    this.setState({ message: 'Listening...' });
  }

  handleSpeech (event) {
    if (!event.results.length) return;

    let result = event.results[event.results.length - 1];
    let message = result[0].transcript;

    this.setState({ message });
    this.props.onChange(message);
  }

  render () {
    return (
      <div>
        <h1>Commando</h1>
        <h4>{ this.state.message }</h4>
        <button onClick={ this.start.bind(this) }>
          Start
        </button>
      </div>
    );
  }
}
