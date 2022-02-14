import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import Bugsnag from '@bugsnag/js';

import Config from '../config';
import logger from '../core/utils/logger';
import version1Routes from './version1Routes';
import errorHandler from '../core/middlewares/errorHandler';
import { shouldInitializeBugsang } from '../core/utils/bugsnag';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';

export const initApp = () => {
  const middleware = shouldInitializeBugsang() ? Bugsnag.getPlugin('express') : null;
  const app = express();

  app.use(helmet());

  // This should be the first middleware in the stack
  // It can only capture errors in downstream middleware
  middleware && app.use(middleware.requestHandler);

  app.use(cors());
  app.use(express.json());

  // add app routers.
  app.use('/api/v1/', version1Routes);

  // error Middleware
  middleware && app.use(middleware?.errorHandler);
  app.use(errorHandler);

  // return 404 Not Found for routes that are invalid.
  app.use((_, res, __) => {
    res.status(StatusCodes.NOT_FOUND).json({
      error: {
        code: StatusCodes.NOT_FOUND,
        message: getReasonPhrase(StatusCodes.NOT_FOUND),
      },
    });
  });

  app.listen(Config().port, () => {
    logger.info(`server started on http://localhost:${Config().port}...`);
  });
};
