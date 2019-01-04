import "@babel/polyfill";

import app from './app';
import logger from './utils/logger';

const port = app.get('port');

/**
 * Start Express server.
 */
const server = app.listen(port, () => {
  logger.debug(
    '  App is running at http://localhost:%d in %s mode',
    port,
    app.get('env'),
  );

  server.on('error', onError);
  server.on('listening', onListening);

  // Handle system signals
  process.on('message', onMessage);
  process.on('SIGTERM', onProcessSignal);

  logger.debug('  Press CTRL-C to stop\n');
});

/**
 * onError Handle server errors
 * @param {Error} - error object which denotes a internal error
 */
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

/**
 * listen binder
 */
const onListening = () => {
  logger.info('application is starting...');
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`listening on ${bind}`);
};

/**
 * message listener
 * @param {number|string} msg
 */
const onMessage = (msg) => {
  if (msg === 'shutdown') {
    logger.info('application shutting down...');
    server.close();
    process.exit(0);
  }
};

/**
 * Handle system signals
 * @param {number|string} msg
 */
const onProcessSignal = (msg) => {
  logger.info('application is shutting down...');

  // Close server
  server.close();

  // Check if this was a shutdown message and exit cleanly
  if (msg && msg === 'shutdown') {
    process.exit(0);
  }

  process.exit(1);
};

export default server;
