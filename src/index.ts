import DotEnv from 'dotenv';

import { initApp } from './app/main';
import { verifyDbConnection } from './core/utils/knex';
import * as Bugsnag from './core/utils/bugsnag';
import { logger } from './core/utils';

// Set env variable.
DotEnv.config();

const build = "dev";

(async () => {
  Bugsnag.initialize()
  await verifyDbConnection();
  initApp();

  if (process.env.NODE_ENV === 'production') {
    process.on('unhandledRejection', (reason, promise) => {
      logger.error(`Unhandle Rejection at: ${promise} with reason ${reason}`)

      Bugsnag.notify(`Unhandle Rejection at: ${promise} with reason ${reason}`)
    })

    process.on('uncaughtException', (err, origin) => {
      logger.error(`Unaught exception: ${err}\n Exception origin: ${origin}`)
      Bugsnag.notify(`Unaught exception: ${err}\n Exception origin: ${origin}`)
      process.exit(1)
    })
  }
})()
