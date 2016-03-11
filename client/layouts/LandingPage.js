import React, { Component } from 'react';
import { fetchProviders } from '../services/api';
import Header from './Header';
import LoginButton from 'components/LoginButton';

export default class LandingPage extends Component {
  constructor (props, context) {
    super(props, context);
    this.state = {
      providers: []
    };
  }

  componentDidMount () {
    fetchProviders().then(({data}) => {
      this.setState({providers: data});
    });
  }

  renderProviders () {
    return this.state.providers.map((name) => {
      return <LoginButton key={name} provider={name} />;
    });
  }

  render () {
    return (
      <Header>
        <h1 className='title'>
          Welcome to Commando
        </h1>

        <div>
          { this.renderProviders() }
        </div>
      </Header>
    );
  }
}
