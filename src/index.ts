import DotEnv from 'dotenv';

import { initApp } from './app/main';
import { logger } from './core/utils';
import Config from './core/config/config';

// Set env variable.
DotEnv.config();

const build = 'dev';

// TODO: Make structured logging.

const config: Object = {
  config: Config(),
  log: logger,
  prefix: 'TODO',
};

/** Entry point for the service */
(function () {
  initApp()

  if (process.env.NODE_ENV === 'production') {
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason)
    })

    process.on('uncaughtException', (err, origin) => {
      console.error(`Caught exception: ${err}\n Exception origin: ${origin}`)
      process.exit(1)
    })
  }
})()

