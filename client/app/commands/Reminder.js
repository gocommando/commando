import React, { Component } from 'react';
import Card, { Body, Media, Content } from '../components/Card';
import TimeAgo from 'react-timeago';

const ANIMATION = {
  duration: 'long',
  animation: 'wobble'
};

export default class Reminder extends Component {
  render () {
    let { scheduled, time, reminder } = this.props;

    return (
      <Card { ...(scheduled ? {} : ANIMATION) }>
        <Content>
          <Media>
            <p className='subtitle is-5'>
              { scheduled ? 'Reminder Scheduled' : 'Reminder Notification' }
            </p>
          </Media>

          <Body>
            { scheduled
                ? <TimeAgo date={ time } component='p' className='title' />
                : <p className='title'>{ reminder }</p> }
          </Body>
        </Content>
      </Card>
    )
  }
}
