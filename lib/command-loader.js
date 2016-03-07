var plugins = require('./plugins');
var commando = require('./commando');

function requireStatement (name, component) {
  return name + ': require("' + component + '").default';
}

module.exports = function(source) {
  plugins.load(); // load all plugins

  var statements = commando.commands.map(cmd => {
    return requireStatement(cmd.name, cmd.component);
  });

  var result = 'module.exports = { ' + statements.join(', ') + ' };';
  console.log(result);
  return result;
};
