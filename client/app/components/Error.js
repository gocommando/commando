import React, { Component, PropTypes } from 'react';
import Card, { CardMedia, CardContent } from '../components/Card';

export default class Error extends Component {
  static propTypes = {
    error: PropTypes.string.isRequired
  };

  render () {
    return (
      <Card>
        <CardMedia>
          <p className='subtitle is-5'>Error</p>
        </CardMedia>
        <CardContent>
          <p className='title'>
            { this.props.error }
          </p>
        </CardContent>
      </Card>
    );
  }
}
