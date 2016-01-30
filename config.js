import path from 'path';
const resolve = path.resolve;

const base = (...args) => {
  return resolve.apply(resolve, [__dirname, ...args]);
};

export default {
  paths: {
    base: base,
    app: base.bind(null, 'client/app'),
    public: base.bind(null, 'build')
  }
};
