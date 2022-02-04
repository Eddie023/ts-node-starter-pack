import DotEnv from 'dotenv';

import { initApp } from './app/main';
import { verifyDbConnection } from './core/utils/knex';

// Set env variable.
DotEnv.config();

const build = "dev";

(async () => {
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
