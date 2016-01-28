export default function () {
  const webpack = require('webpack');
  const webpackConfig = require('../../webpack.config');
  const webpackMiddleware = require('webpack-dev-middleware');

  return webpackMiddleware(webpack(webpackConfig), {
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true
    }
  });
}
