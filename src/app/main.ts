import cors from 'cors';
import express from 'express';

import { config } from '../core/config';
import logger from '../core/utils/logger';
import version1Routes from './version1Routes';

export const initApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Add app routers.
  app.use('/v1/', version1Routes);

  // TODO: Convert this to error middlewre
  app.use((err: any, req: any, res: any, next: any) => {
    // TODO: Maybe I should log the request context.
    const { statusCode = 500, message } = err;
    res.status(statusCode).json({
      status: 'Error',
      statusCode,
      message,
    });
  });

  app.listen(config().port, () => {
    logger.info(`Listening on port ${config().port}...`);
  });
}

