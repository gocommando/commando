import React, { Component, PropTypes } from 'react';

export default class SpeechInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context);
    this.state = { message: null };
  }

  componentDidMount () {
    this.recognizer = new webkitSpeechRecognition();
    this.recognizer.lang = 'en';
    this.recognizer.onresult = this.handleSpeech.bind(this);
  }

  startSpeech () {
    this.recognizer.start();
    this.setState({ message: 'Listening...' });
  }

  handleSpeech (event) {
    if (!event.results.length) return;

    let result = event.results[event.results.length - 1];
    let message = result[0].transcript;

    this.setState({ message: null });
    this.props.onChange(message);
  }

  handleSubmit (event) {
    event.preventDefault();
    this.setState({ message: null });
    this.props.onChange(this.state.message);
  }

  handleChange (event) {
    event.preventDefault();
    let message = event.target.value;
    this.setState({ message });
  }

  render () {
    return (
      <form onSubmit={ this.handleSubmit.bind(this) } className='speech-input'>
        <p className='control is-grouped'>
          <input className='input is-large' type='text'
                 placeholder='How may I assist you?'
                 autoFocus='true'
                 value={ this.state.message }
                 onChange={ this.handleChange.bind(this) } />

          <a className='button is-outlined is-large' onClick={ this.startSpeech.bind(this) }>
            <i className='fa fa-microphone'></i>
          </a>

          <input type='submit' style={{display: 'none'}} />
        </p>
      </form>
    );
  }
}
