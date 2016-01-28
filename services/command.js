import _ from 'lodash';

function assertRequiredKeys(obj) {
  const requiredKeys = ['name', 'pattern', 'invoke'];
  const missing = requiredKeys.filter(k => !obj[k]);

  if (missing.length) {
    throw new Error(`Command is missing required keys: ${missing.join(', ')}`);
  }
}

const defaults = {
  id: undefined,
  name: undefined,
  pattern: undefined,
  properties: [],

  toJSON() {
    return _.pick(this, 'id', 'name', 'properties');
  },

  recognize(text) {
    return text.match(this.pattern);
  },

  invoke() {
    throw new Error(`invoke not implemented for ${this.name}`);
  },

  extract(text) {
    const matches = text.match(this.pattern);

    if (matches) {
      const props = _.map(this.properties, 'name');
      return _.zipObject(props, _.tail(matches))
    }
  }
};

export function build (obj) {
  assertRequiredKeys(obj);
  obj.id = obj.id || _.uniqueId();
  return _.extend({}, defaults, obj);
};
