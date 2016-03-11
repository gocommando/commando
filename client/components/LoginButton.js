import React, { Component, PropTypes } from 'react';

function capitalize (s) {
  return s[0].toUpperCase() + s.slice(1);
}

export default class LoginButton extends Component {
  static propTypes = {
    provider: PropTypes.string.isRequired
  };

  render () {
    let url = `/connect/${this.props.provider}`;
    let name = capitalize(this.props.provider);
    let linkClass = `button login-button ${this.props.provider}`;
    let iconClass = `fa fa-${this.props.provider}`;

    return (
      <a href={url} className={linkClass}>
        <i className={iconClass}></i> Log in with { name }
      </a>
    );
  }
}
