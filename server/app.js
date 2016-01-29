import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import historyApiFallback from 'connect-history-api-fallback';
import commands from './routes/commands';
import webpack from './middleware/webpack';
import config from '../config';

const DEVELOPMENT = process.env.NODE_ENV === 'development';

const app = express();

if (DEVELOPMENT) {
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/commands', commands);

app.use(historyApiFallback({
  verbose: false
}));

if (DEVELOPMENT) {
  app.use(express.static(config.paths.public()));
  app.use(webpack());
}

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    if (err.status !== 404) {
      console.error(err.stack);
    }

    next(err);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  });
});

export default app;
