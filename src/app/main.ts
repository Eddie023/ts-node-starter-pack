import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import Bugsnag from '@bugsnag/js';

import Config from '../config';
import logger from '../core/utils/logger';
import version1Routes from './version1Routes';
import errorHandler from '../core/middlewares/errorHandler';
import { shouldInitializeBugsang } from '../core/utils/bugsnag';

export const initApp = () => {
  const middleware = shouldInitializeBugsang() ? Bugsnag.getPlugin('express') : null;
  const app = express();

  app.use(helmet())

  // This should be the first middleware in the stack.
  // It can only capture errors in downstream middleware.
  middleware && app.use(middleware.requestHandler)

  app.use(cors());
  app.use(express.json());

  // Add app routers.
  app.use('/api/v1/', version1Routes);

  // Error Middleware
  middleware && app.use(middleware?.errorHandler)
  app.use(errorHandler);

  app.listen(Config().port, () => {
    logger.info(`Listening on port ${Config().port}...`);
  });
}

