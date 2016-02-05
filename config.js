import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const ENV = process.env.NODE_ENV || 'development';

const base = (...args) => {
  const resolve = path.resolve;
  return resolve.apply(resolve, [__dirname, ...args]);
};

export default {
  development: ENV === 'development',
  test: ENV === 'test',
  production: ENV === 'production',

  tokens: {
    google: process.env.GOOGLE_TOKEN
  },

  paths: {
    base: base,
    app: base.bind(null, 'client/app'),
    public: base.bind(null, 'build')
  },

  configure () {
    if (!this.tokens.google) {
      console.error('Error: Missing GOOGLE_TOKEN environment variable.');
    }
  }
};
