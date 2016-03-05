import path from 'path';
import packageJSON from '../package.json';
const packages = Object.keys(packageJSON['dependencies']);

function dependencyFilter (dependency) {
  return /^commando-(.+)/.test(dependency);
}

function pluginNames () {
  let names = packages.filter(dependencyFilter);
  return names.concat(['../commands']);
}

export function paths () {
  return pluginNames().map(plugin => {
    return path.dirname(require.resolve(plugin));
  });
}

export function load () {
  pluginNames().forEach(plugin => require(plugin));
}
