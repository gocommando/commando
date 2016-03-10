import React, { Component, PropTypes } from 'react';
import Card, { Body, Media, Content } from 'components/Card';
import say, { isSupportedBrowser } from 'services/say';

export default class Speak extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    previouslyExecuted: PropTypes.bool
  };

  componentDidMount () {
    if (!this.props.previouslyExecuted) {
      this.speak();
    }
  }

  speak () {
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
