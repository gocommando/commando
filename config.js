import path from 'path';

const ENV = process.env.NODE_ENV || 'development';
const resolve = path.resolve;

const base = (...args) => {
  return resolve.apply(resolve, [__dirname, ...args]);
};

export default {
  development: ENV === 'development',
  test: ENV === 'test',
  production: ENV === 'production',

  paths: {
    base: base,
    app: base.bind(null, 'client/app'),
    public: base.bind(null, 'build')
  }
};
