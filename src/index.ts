import cors from 'cors';
import DotEnv from 'dotenv';
import express from 'express';

// Set env variable.
DotEnv.config();

import routes from './routes';
import { logger } from './core/utils';
import { config } from './core/config';

async function bootstrap() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Add app routers.
  app.use('/', routes);

  app.use((err: any, req: any, res: any, next: any) => {
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

bootstrap();
