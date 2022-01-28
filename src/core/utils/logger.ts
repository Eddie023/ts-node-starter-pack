import * as winston from 'winston';

import { config } from '../config';

const customFormat = winston.format.printf(
  ({ level, message }) => `${new Date(Date.UTC(0, 0, 0, 0, 0))}--[ ${level.toUpperCase()} ]: ${message}`
);

const logger = winston.createLogger({
  level: config().logLevel,
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// If not production then log to console with simple format.
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: customFormat,
    })
  );
}

export default logger;
