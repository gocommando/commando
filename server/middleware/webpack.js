import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';

export default function (app) {
  const compiler = webpack(webpackConfig);

  app.use(devMiddleware(compiler, {
    stats: {
      chunks: false,
      chunkModules: false,
      colors: true
    }
  }));

  app.use(hotMiddleware(compiler));
}
