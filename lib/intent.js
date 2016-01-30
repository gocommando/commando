import {
  extend,
  pick,
  tail,
  zipObject
} from 'lodash';

function assertKeys (obj, keys) {
  const missing = keys.filter(k => !obj[k]);

  if (missing.length) {
    throw new Error(`Command is missing required keys: ${missing.join(', ')}`);
  }
}

const defaults = {
  intent: undefined,
  name: undefined,
  properties: [],

  toJSON () {
    return pick(this, 'intent', 'name', 'properties');
  }
};

const regexDefaults = {
  pattern: undefined,

  extract (text) {
    return zipObject(
      this.properties.map(prop => prop.name),
      tail(text.match(this.pattern))
    );
  }
};

// TODO: parameterize intent for url safety
export function regex (obj) {
  assertKeys(obj, ['name', 'pattern', 'invoke']);
  obj.intent = obj.intent || obj.name.toLowerCase();
  return extend({}, defaults, regexDefaults, obj);
}
