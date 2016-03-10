import React, { Component, PropTypes } from 'react';
import Speech from 'services/speech';
import rotateExamples from 'services/examples';
import classnames from 'classnames';
import { playSpeechRecognized } from 'services/sounds';

const speech = new Speech();

export default class SpeechInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired
  };

  constructor (props, context) {
    super(props, context);

    this.state = {
      message: null,
      example: 'How may I assist you?',
      listening: false
    };
  }

  componentDidMount () {
    speech.removeAllListeners();
    speech.on('interim', ::this.handleInterim);
    speech.on('complete', ::this.handleComplete);
    speech.on('start', ::this.speechDidStart);
    speech.on('error', ::this.handleError);
    speech.start();
    rotateExamples(::this.changeExample);
  }

  changeExample (err, example) {
    if (!err) this.setState({ example });
  }

  speechDidStart () {
    this.setState({ listening: true });
  }

  handleError (error) {
    this.props.onError(error);
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
    if (speech.isNotSupported) return;

    let classes = classnames('button is-outlined is-large', {
      'is-loading': this.state.listening
    });

    return (
      <a className={ classes } onClick={ ::speech.start }>
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
