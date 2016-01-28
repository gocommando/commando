var path = require('path');
var glob = require('glob');
var command = require('./command');
var loadPath = path.resolve('commands/**/*.js');

var commands = glob.sync(loadPath).map(function (file) {
  return command.extend(require(file));
});

exports.toJSON = function () {
  return commands.map(function (cmd) {
    return cmd.toJSON();
  });
};

exports.find = function(id) {
  return commands.find(function (cmd) {
    return cmd.id === id;
  });
};

exports.recognize = function (text) {
  return commands.find(function (cmd) {
    return cmd.recognize(text);
  });
};
