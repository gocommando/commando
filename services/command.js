var _ = require('lodash');

function assertRequiredKeys (obj) {
  var missing = ['name', 'pattern', 'invoke'].filter(function (k) {
    return !obj[k];
  });

  if (missing.length) {
    throw new Error('Command is missing required keys: ' + missing.join(', '));
  }
}

var defaults = {
  id: undefined,
  name: undefined,
  pattern: undefined,
  properties: [],

  toJSON: function () {
    return _.pick(this, 'id', 'name', 'properties');
  },

  recognize: function (text) {
    return text.match(this.pattern);
  },

  invoke: function () {
    throw new Error('invoke not implemented for ' + this.name);
  },

  extract: function (text) {
    var matches = text.match(this.pattern);

    if (matches) {
      var props = _.map(this.properties, 'name');
      return _.zipObject(props, _.tail(matches))
    }
  }
};

exports.extend = function (obj) {
  assertRequiredKeys(obj);
  obj.id = obj.id || _.uniqueId();
  return _.extend({}, defaults, obj);
};
