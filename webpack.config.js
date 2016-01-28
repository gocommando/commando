var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

function development (devel, prod) {
  return process.env.NODE_ENV === 'production' ? prod : devel;
}

module.exports = {
  entry: './src/app.js',

  devtool: development('source-map'),

  output: {
    filename: 'app.js',
    path: path.join(__dirname, 'dist')
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
      template: './src/index.html',
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};
