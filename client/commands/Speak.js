import React, { Component, PropTypes } from 'react';
import Card, { Body, Media, Content } from 'components/Card';
import say, { isSupportedBrowser } from 'services/say';
import storage from 'services/localstorage';

const store = storage('speakComponentSaid', []);

function hasNotSaid (id) {
  return !~store.read().indexOf(id);
}

export default class Speak extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  };

  componentDidMount () {
    if (hasNotSaid(this.props.id)) {
      this.speak();
    }
  }

  speak () {
    if (hasNotSaid(this.props.id)) {
      store.write([this.props.id, ...store.read()]);
    }

    if (isSupportedBrowser) {
      say(this.props.message);
    }
  }

  renderButton () {
    if (!isSupportedBrowser) return;

    return (
      <button onClick={ ::this.speak } type='button' className='button is-primary'>
        Speak
      </button>
    );
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
            { this.renderButton() }
          </Body>
        </Content>
      </Card>
    );
  }
}
