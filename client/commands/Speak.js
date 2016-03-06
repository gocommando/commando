import React, { Component, PropTypes } from 'react';
import Card, { Body, Media, Content } from 'components/Card';
import { once } from 'lodash';

function findVoiceSync (name) {
  return speechSynthesis.getVoices().find((voice) => {
    return voice.name === name;
  });
}

function findVoice (name, callback) {
  let allVoices = speechSynthesis.getVoices();

  if (!allVoices.length) {
    speechSynthesis.onvoiceschanged = once(() => {
      callback(findVoiceSync(name));
    });
  } else {
    callback(findVoiceSync(name));
  }
}

export default class Speak extends Component {
  static propTypes = {
    message: PropTypes.string.isRequired
  };

  componentDidMount () {
    this.speak();
  }

  speak () {
    findVoice('Google UK English Male', (voice) => {
      let msg = new SpeechSynthesisUtterance(this.props.message);
      msg.voice = voice;
      speechSynthesis.speak(msg);
    });
  }

  render () {
    return (
      <Card>
        <Content>
          <Media>
            <p className='subtitle is-5'>Commando says:</p>
          </Media>
          <Body>
            <p className='title'>
              { this.props.message }
            </p>
            <button onClick={ this.speak.bind(this) } type='button' className='button is-primary'>
              Speak
            </button>
          </Body>
        </Content>
      </Card>
    );
  }
}
