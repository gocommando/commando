import React, { Component, PropTypes } from 'react';

export default class Root extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
    return (
      <div className='root'>
        { this.props.children }
      </div>
    );
  }
}
