import React, { PropTypes, Component } from 'react';
import Error from '../components/Error';

function findComponent (component) {
  return require(`../commands/${component}`).default;
}

function componentFor ({ error, response }, index) {
  if (error) {
    return <Error { ...error } key={ index }/>;
  } else {
    let Command = findComponent(response.component);
    return <Command { ...response.props } key={ index } />;
  }
}

export default class CommandList extends Component {
  static propTypes = {
    commands: PropTypes.array.isRequired
  };

  render () {
    const commands = this.props.commands.map(componentFor);

    return (
      <section className='card-list'>
        <div className='container'>
          { commands }
        </div>
      </section>
    );
  }
}
