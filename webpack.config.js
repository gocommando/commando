var config = require('./config');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpackConfig = {
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    config.paths.app('app.js')
  ],

  output: {
    filename: 'app.js',
    path: config.paths.public()
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: config.development
          ? ['es2015', 'stage-0', 'react', 'react-hmre']
          : ['es2015', 'stage-0', 'react']
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

if (config.development) {
  webpackConfig.devtool = 'source-map';

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  );
}

module.exports = webpackConfig;
