import { commands } from 'commando';
import './boot';

function requireStatement (name, component) {
  return name + ': require("' + component + '").default';
}

module.exports = function (source) {
  const statements = commands.map(cmd => {
    return requireStatement(cmd.name, cmd.component);
  });

  return 'module.exports = { ' + statements.join(', ') + ' };';
};
