import React, { Component } from 'react';

export default class Header extends Component {
  render () {
    return (
      <div className='hero-header'>
        <header className='header'>
          <div className='container'>
            <div className='header-left'>
              <a className='header-item title' href='#'>
                Commando
              </a>
            </div>
          </div>
        </header>
      </div>
    );
  }
}
