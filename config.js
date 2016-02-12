import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const ENV = process.env.NODE_ENV || 'development';

const base = (...args) => {
  const resolve = path.resolve;
  return resolve.apply(resolve, [__dirname, ...args]);
};

export default {
  env: {
    development: ENV === 'development',
    test: ENV === 'test',
    production: ENV === 'production'
  },

  tokens: {
    google: process.env.GOOGLE_TOKEN
  },

  paths: {
    base: base,
    client: base.bind(null, 'client/app'),
    server: base.bind(null, 'server'),
    public: base.bind(null, 'build')
  },

  configure () {
    if (!this.tokens.google) {
      console.error('Error: Missing GOOGLE_TOKEN environment variable.');
    }
  }
};
