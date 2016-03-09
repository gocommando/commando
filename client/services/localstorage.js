import extend from 'lodash/fp/extend';

const store = {
  read: function () {
    try {
      const value = localStorage.getItem(this.key);
      return value === null ? this.defaultValue : JSON.parse(value);
    } catch (e) {
      localStorage.removeItem(this.key); // Possibly corrupted
      return this.defaultValue;
    }
  },

  write: function (value) {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }
};

export default function storage (key, defaultValue) {
  return extend({ key, defaultValue }, store);
}
