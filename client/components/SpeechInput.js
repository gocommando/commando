import React, { Component, PropTypes } from 'react';
import { get } from 'axios';
import Speech from 'services/speech';
import { playSpeechRecognized } from 'services/sounds';
import classnames from 'classnames';

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
    this.speech = new Speech();

    this.state = {
      message: null,
      example: 'How may I assist you?',
      listening: false
    };
  }

  componentDidMount () {
    this.speech.on('interim', ::this.handleInterim);
    this.speech.on('complete', ::this.handleComplete);
    this.speech.on('start', ::this.speechDidStart);
    this.speech.on('error', ::this.speechDidEnd);
    this.startSpeech();
    rotateExamples(::this.changeExample);
  }

  changeExample (err, example) {
    if (!err) this.setState({ example });
  }

  startSpeech () {
    this.speech.start();
  }

  speechDidStart () {
    this.setState({ listening: true });
  }

  speechDidEnd () {
    this.setState({ listening: false });
  }

  handleInterim ([message]) {
    this.setState({ message });
  }

  handleComplete ([message]) {
    playSpeechRecognized();
    this.setState({ message: null });
    this.props.onChange(message);
  }

  handleSubmit (event) {
    event.preventDefault();
    this.handleComplete([this.state.message]);
  }

  handleChange (event) {
    event.preventDefault();
    this.handleInterim([event.target.value]);
  }

  placeholder () {
    return this.state.listening ? 'Listening...' : this.state.example;
  }

  renderInput () {
    return (
      <input className='input is-large' type='text'
             placeholder={ this.placeholder() }
             value={ this.state.message }
             onChange={ ::this.handleChange } />
    );
  }

  renderButton () {
    if (this.speech.isNotSupported) return;

    let classes = classnames('button is-outlined is-large', {
      'is-loading': this.state.listening
    });

    return (
      <a className={ classes } onClick={ ::this.startSpeech }>
        { this.state.listening ? null : <i className='fa fa-microphone'></i> }
      </a>
    );
  }

  render () {
    return (
      <form onSubmit={ ::this.handleSubmit } className='speech-input'>
        <div className='control is-grouped'>
          { this.renderInput() }
          { this.renderButton() }
          <input type='submit' style={{display: 'none'}} />
        </div>
      </form>
    );
  }
}
