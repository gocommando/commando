import React, { PropTypes, Component } from 'react';
import Introduction from './Introduction';
import Error from './Error';
import commands from '../commands';
import storage from '../services/localstorage';

const store = storage('introduction', { shown: true });

function findComponent (name) {
  if (!commands[name]) {
    const available = Object.keys(commands);
    throw new Error(`Component '${name}' not found. The following components have been loaded: ${available}`);
  }

  return commands[name];
}

function componentFor ({ error, response, id }) {
  if (error) {
    return <Error { ...error } key={ id }/>;
  } else {
    let component = findComponent(response.name);
    let props = { ...response.props, id, key: id };
    return React.createElement(component, props);
  }
}

export default class CommandList extends Component {
  static propTypes = {
    commands: PropTypes.array.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentDidMount () {
    store.write({ shown: false });
  }

  reset (event) {
    store.write({ shown: true });
    this.props.reset(event);
  }

  renderReset () {
    if (!this.props.commands.length) return;

    return (
      <div className='card animated fadeInUp'>
        <div className='card-content'>
          <a href='#' className='content' onClick={ ::this.reset }>
            Reset Commands
          </a>
        </div>
      </div>
    );
  }

  render () {
    return (
      <section className='command-list'>
        <div className='container'>
          { this.props.commands.length
              ? this.props.commands.map(componentFor)
              : <Introduction showAnimation={ store.read().shown } /> }

          { this.renderReset() }
        </div>
      </section>
    );
  }
}
