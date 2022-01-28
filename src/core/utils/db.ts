import { Connection, createConnection } from 'typeorm';

import logger from './logger';
import { config } from '../config';

const DB_CONFIG = {
  ...config().db,
  synchronize: true,
  logging: false,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscribers/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};

export async function createDbConnection(): Promise<Connection> {
  try {
    logger.debug('Db connection initiating...');

    const conn = await createConnection(DB_CONFIG as any);

    logger.debug('Db connection resolved.');
    return conn;
  } catch (error) {
    logger.error('Failed to resolve db connection with error: ', error);

    throw new Error('DB connection failed');
  }
}
