import { middleware, requestUtils } from 'drakov';

import app from './app';
import config from './helpers/config_helper';
import logger from './utils/logger';

const { drakovOptions } = config;
const { port } = config.application;

app.use(requestUtils.getBody);

middleware.init(app, drakovOptions, (err, middlewareFunction) => {
  if (err) {
    throw err;
  }

  app.use(middlewareFunction);
  const server = app.listen(port);

  // Handle server errors
  const onError = (e) => {
    logger.warn('Error with server.');

    switch (e.code) {
      case 'EACCES':
        logger.error('Port %d requires elevated privileges.', port);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error('Port %d is already in use.', port);
        process.exit(1);
        break;
      default:
        throw e;
    }
  };

  // Handle server startup
  const onListening = () => {
    const addr = server.address();
    const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info('Application is starting...');
    logger.info(`Server listening on ${bind}`);
  };

  // Handle messages
  const onMessage = (msg) => {
    if (msg && msg === 'shutdown') {
      // Close server and exit cleanly
      server.close();
      process.exit(0);
    }
  };

  // Handle system signals
  const onProcessSignal = (msg) => {
    logger.info('Application is shutting down...');

    // Close server
    server.close();

    // Check if this was a shutdown message and exit cleanly
    if (msg && msg === 'shutdown') {
      process.exit(0);
    }

    process.exit(1);
  };

  server.on('error', onError);
  server.on('listening', onListening);

  // Handle system signals
  process.on('message', onMessage);
  process.on('SIGTERM', onProcessSignal);
});
