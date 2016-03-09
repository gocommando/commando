import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import logo from 'static/images/logo.png';

const ANIMATIONS = [
  'zoomInRight',
  'swing short',
  'zoomOutLeft'
];

function animatedLogo (animation) {
  return (
    <div className='introduction-logo'>
      <div className='introduction-backdrop'></div>
      <img className={`logo animated ${animation}`} src={ logo } alt='' />
    </div>
  );
}

export default class Introduction extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = { animation: 0 };
  }

  componentDidMount () {
    const element = findDOMNode(this);

    element.addEventListener('webkitAnimationEnd', () => {
      this.setState({ animation: this.state.animation + 1 });
    }, false);
  }

  render () {
    const animation = ANIMATIONS[this.state.animation];

    if (animation) {
      return animatedLogo(animation);
    } else {
      return (
        <div className='introduction title is-3'>
          Click the microphone to get started.
        </div>
      );
    }
  }
}
