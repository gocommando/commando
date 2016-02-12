import React, { PropTypes, Component } from 'react';
import Error from '../components/Error';

function findComponent (component) {
  let mod = require(`../commands/${component}`);
  return mod.default || mod; // Compat with common JS
}

function componentFor ({ error, response, id }) {
  if (error) {
    return <Error { ...error } key={ id }/>;
  } else {
    let Command = findComponent(response.component);
    return <Command { ...response.props } key={ id } />;
  }
}

export default class CommandList extends Component {
  static propTypes = {
    commands: PropTypes.array.isRequired
  };

  render () {
    return (
      <section className='command-list'>
        <div className='container'>
          { this.props.commands.map(componentFor) }
        </div>
      </section>
    );
  }
}
