import React, { PropTypes, Component } from 'react';
import Error from './Error';
import { find as findCommand } from '../commands';

function componentFor ({ error, response, id }) {
  if (error) {
    return <Error { ...error } key={ id }/>;
  } else {
    let component = findCommand(response.component);
    let props = { ...response.props, key: id };
    return React.createElement(component, props);
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
