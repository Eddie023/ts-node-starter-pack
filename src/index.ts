import DotEnv from 'dotenv';

import { initApp } from './app/main';
import { verifyDbConnection } from './core/utils/knex';
import * as Bugsnag from './core/utils/bugsnag';

// Set env variable.
DotEnv.config();

const build = "dev";

(async () => {
  Bugsnag.initialize()
  await verifyDbConnection();
  initApp();

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
