import React, { Component, PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { fetchCurrentUser } from 'services/api';

export default class Header extends Component {
  static propTypes = {
    children: PropTypes.node
  };

  constructor (props, context) {
    super(props, context);
    this.state = { user: null };
  }

  componentDidMount () {
    fetchCurrentUser().then(({data}) => {
      console.log(data);
      this.setState({ user: data });
    }).catch(err => console.error(err));
  }

  loginStatusChanged (auth) {
    if (auth) {
      browserHistory.push('/dashboard');
    } else {
      browserHistory.push('/');
    }
  }

  renderRightNav () {
    if (!this.state.user) {
      return;
    }

    return (
      <span className='header-item'>
        <a href='/auth/logout'>
          { this.state.user.name} | Log out
        </a>
      </span>
    );
  }

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
              <div className='header-right header-menu'>
                { this.renderRightNav() }
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
