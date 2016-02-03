import React, { Component, PropTypes } from 'react';

export class CardMedia extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render () {
    return (
      <div className='media'>
        <div className='media-content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export class CardContent extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render () {
    return (
      <div className='content'>
        { this.props.children }
      </div>
    );
  }
}

export default class Card extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  };

  render () {
    return (
      <div className='card'>
        <div className='card-content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}
