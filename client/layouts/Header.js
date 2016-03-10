import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  render () {
    return (
      <section className='hero is-primary'>
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

        <div className='hero-content'>
          <div className='container'>
            { this.props.children }
          </div>
        </div>
      </section>
    );
  }
}
