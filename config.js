import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ silent: true });

const ENV = process.env.NODE_ENV || 'development';

const base = (...args) => {
  const resolve = path.resolve;
  return resolve.apply(resolve, [__dirname, ...args]);
};

export const env = {
  development: ENV === 'development',
  test: ENV === 'test',
  production: ENV === 'production'
};

export const tokens = {
  google: process.env.GOOGLE_TOKEN
};

export const paths = {
  base: base,
  client: base.bind(null, 'client'),
  server: base.bind(null, 'server'),
  public: base.bind(null, 'build')
};

export function configure () {
  if (!tokens.google) {
    console.error('Error: Missing GOOGLE_TOKEN environment variable.');
  }
}
