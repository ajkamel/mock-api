import { createLogger, format, transports } from 'winston';
import program from '../helpers/command_helper';

const {
  colorize, combine, timestamp, printf,
} = format;

// This will log debug to the console when using --debug flag (optional)
const level = program.debug ? 'debug' : 'info';

/**
 * @param {Object} options - these are different parts of data from the log message
 * @return {String} returns the assembled log message formated correctly
 */
const currentFormat = printf((options) => {
  return `${options.timestamp} ${options.level}: ${options.message}`;
});

const logger = createLogger({
  'level': level,
  format: combine(
    timestamp(), // customize the date format here
    colorize(), // customize the color of the log levels here
    currentFormat, // this format is the custom one from above
  ),
  transports: [
    new (transports.Console)(),
  ],
});

export default logger;
