import React, { Component, PropTypes } from 'react';
import Card, { Media, Content, Body } from '../components/Card';

export default class Error extends Component {
  static propTypes = {
    error: PropTypes.string.isRequired
  };

  render () {
    return (
      <Card>
        <Content>
          <Media>
            <p className='subtitle is-5'>Whoops!</p>
          </Media>
          <Body>
            <p className='title'>
              { this.props.error }
            </p>
          </Body>
        </Content>
      </Card>
    );
  }
}
