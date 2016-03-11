import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import { paths, env, urls } from './config';

const webpackConfig = {
  entry: [
    paths.client('app.js')
  ],

  resolve: {
    root: paths.client()
  },

  output: {
    filename: 'app.js',
    path: paths.public()
  },

  module: {
    loaders: [{
      test: new RegExp(paths.client('commands.js')),
      loader: paths.config('command-loader')
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        cacheDirectory: true,
        plugins: ['transform-runtime'],
        presets: env.development
          ? ['es2015', 'stage-0', 'react', 'react-hmre']
          : ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.(mp3|png)$/,
      loader: 'file'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      FIREBASE_URL: `"${urls.firebase}"`
    }),
    new HtmlWebpackPlugin({
      template: paths.client('index.html'),
      favicon: paths.client('static/images/favicon.ico'),
      hash: false,
      filename: 'index.html',
      inject: 'body',
      minify: {
        collapseWhitespace: true
      }
    })
  ]
};

if (env.development) {
  webpackConfig.devtool = 'source-map';

  webpackConfig.entry.unshift(
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
  );

  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new WebpackNotifierPlugin({
      title: 'Commando',
      contentImage: paths.client('static/images/logo.png')
    })
  );
}

export default webpackConfig;
