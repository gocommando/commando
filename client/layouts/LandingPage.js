import React, { Component } from 'react';
import Header from './Header';

export default class LandingPage extends Component {
  render () {
    return (
      <Header>
        <h1 className='title'>
          Welcome to Commando
        </h1>
      </Header>
    );
  }
}
