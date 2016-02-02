var config = require('./config');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function development (devel, prod) {
  return config.development ? devel : prod;
}

module.exports = {
  entry: config.paths.app('app.js'),

  devtool: development('eval-source-map'),

  output: {
    filename: 'app.js',
    path: config.paths.public()
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: ['es2015', 'react']
      }
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: config.paths.app('index.html'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};
