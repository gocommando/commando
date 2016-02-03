import React, { Component, PropTypes } from 'react';

function availableVoices () {
  return speechSynthesis.getVoices().filter(function (voice) {
    return voice.lang === 'en-US';
  });
}

export default class Speak extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  constructor (props, context) {
    super(props, context);

    this.state = {
      speaking: false
    };
  }

  componentDidMount () {
    this.speak();
  }

  speak () {
    this.setState({ speaking: true });
    let msg = new SpeechSynthesisUtterance(this.props.message);
    msg.voice = availableVoices()[0];
    msg.onend = () => this.setState({ speaking: false });
    speechSynthesis.speak(msg);
  }

  render () {
    let buttonClasses = 'button is-primary';

    if (this.state.speaking) {
      buttonClasses += ' is-loading';
    }

    return (
      <div className='card'>
        <div className='card-content'>
          <div className='media'>
            <div className='media-content'>
              <p className='title is-5'>Commando says:</p>
            </div>
          </div>

          <div className='content'>
            <h2>{ this.props.message }</h2>
            <button onClick={ this.speak.bind(this) } type='button' className={ buttonClasses }>
              Speak
            </button>
          </div>
        </div>
      </div>
    );
  }
}
