import React, { Component, PropTypes } from 'react';
import Card, { CardMedia, CardContent } from '../components/Card';

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
      <Card>
        <CardMedia>
          <p className='subtitle is-5'>Commando says:</p>
        </CardMedia>
        <CardContent>
          <p className='title'>
            { this.props.message }
          </p>
          <button onClick={ this.speak.bind(this) } type='button' className={ buttonClasses }>
            Speak
          </button>
        </CardContent>
      </Card>
    );
  }
}
