import DotEnv from 'dotenv';

import { initApp } from './app/main';
import { initDatabase } from './core/utils/knex';
import * as Bugsnag from './core/utils/bugsnag';
import { logger } from './core/utils';

// set env variable
DotEnv.config();

const build = 'dev';

/**
 * TODO:
 * 1. Write tests
 * 2. Joi Middleware for Validation
 * 3. Kubernetes Setup
 * 4. ELK stack setup
 * 5. Nginx
 * 6. Redis
 * 7. Session/Cookies
 * 8. CI/CD setup
 * 9. Add husky
 */

// load app only if db is alive and kicking
initDatabase()
  .then(() => {
    logger.info('db connection established');

    Bugsnag.initialize();

    initApp();

    if (process.env.NODE_ENV === 'production') {
      process.on('unhandledRejection', (reason, promise) => {
        logger.error(`Unhandle Rejection at: ${promise} with reason ${reason}`);

        Bugsnag.notify(`Unhandle Rejection at: ${promise} with reason ${reason}`);
      });

      process.on('uncaughtException', (err, origin) => {
        logger.error(`Unaught exception: ${err}\n Exception origin: ${origin}`);
        Bugsnag.notify(`Unaught exception: ${err}\n Exception origin: ${origin}`);
        process.exit(1);
      });
    }
  })
  .catch((err) => {
    logger.error(`db is not ready, err: ${err}`);
  });
