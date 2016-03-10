import React, { Component } from 'react';

export default class Root extends Component {
  render () {
    return (
      <div className='root'>
        { this.props.children }
      </div>
    );
  }
}
