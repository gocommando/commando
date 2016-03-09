import React, { Component, PropTypes } from 'react';
import { get } from 'axios';
import listeningSound from '../static/sounds/listening.mp3';
import notListeningSound from '../static/sounds/notlistening.mp3';
import classnames from 'classnames';

function buttonClasses (isListening) {
  return classnames('button is-outlined is-large', {
    'is-loading': isListening
  });
}

function rotateThrough (data, callback) {
  let i = 0;

  callback(null, data[0].example);

  setInterval(() => {
    i++;
    let val = data[i % data.length];
    callback(null, val.example);
  }, 2000);
}

async function rotateExamples (callback) {
  try {
    let result = await get('/api/commands');
    rotateThrough(result.data, callback);
  } catch (e) {
    callback(e);
  }
}

export default class SpeechInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context);
    this.commands = [];
    this.state = {
      message: null,
      example: 'How may I assist you?'
    };
  }

  componentDidMount () {
    this.recognizer = new webkitSpeechRecognition();
    this.recognizer.lang = 'en';
    this.recognizer.interimResults = true;
    this.recognizer.onresult = this.handleSpeech.bind(this);
    this.recognizer.onstart = this.speechDidStart.bind(this);
    this.recognizer.onend = this.speechDidEnd.bind(this);
    rotateExamples(this.changeExample.bind(this));
  }

  changeExample (err, example) {
    if (!err) {
      this.setState({ example });
    }
  }

  startSpeech () {
    this.recognizer.start();
  }

  speechDidStart () {
    new Audio(listeningSound).play();
    this.setState({ message: 'Listening...' });
  }

  speechDidEnd () {
    new Audio(notListeningSound).play();
    this.setState({ message: null });
  }

  handleSpeech (event) {
    if (!event.results.length) return;

    let result = event.results[event.results.length - 1];
    let message = result[0].transcript;

    this.setState({ message });

    if (result.isFinal) {
      this.props.onChange(message);
    }
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
        <div className='control is-grouped'>
          <input className='input is-large' type='text'
                 placeholder={ this.state.example }
                 value={ this.state.message }
                 onChange={ this.handleChange.bind(this) } />

          <a className={ buttonClasses(this.state.message) } onClick={ this.startSpeech.bind(this) }>
            { this.state.message ? <noscript /> : <i className='fa fa-microphone'></i> }
          </a>

          <input type='submit' style={{display: 'none'}} />
        </div>
      </form>
    );
  }
}
