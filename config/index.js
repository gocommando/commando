import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const ENV = process.env.NODE_ENV || 'development';

const base = (...args) => {
  const resolve = path.resolve;
  return resolve.apply(resolve, [__dirname, '..', ...args]);
};

export const env = {
  development: ENV === 'development',
  test: ENV === 'test',
  production: ENV === 'production'
};

export const tokens = {
  google: process.env.GOOGLE_TOKEN
};

export const urls = {
  firebase: process.env.FIREBASE_URL
}

export const paths = {
  base: base,
  lib: base.bind(null, 'lib'),
  config: base.bind(null, 'config'),
  client: base.bind(null, 'client'),
  server: base.bind(null, 'server'),
  public: base.bind(null, 'build')
};

if (!urls.firebase) {
  console.error('missing FIREBASE_URL environment variable');
  process.exit(1);
}

if (!tokens.google) {
  console.warn('missing GOOGLE_TOKEN environment variable.');
}
