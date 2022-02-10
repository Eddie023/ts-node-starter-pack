import Knex from 'knex';

import logger from './logger';
import Config from '../../config';

/** getKenxConnection initializes knex connection. */
export const getKnexConnection = (): any => {
  const { username, database, password, host, port } = Config().db;

  return Knex({
    client: 'postgres',

    useNullAsDefault: true,

    connection: {
      user: username,
      database: database,
      password: password,
      port: Number(port) || 5432,
      host: host,
    },

    log: {
      error(message) {
        console.error('the error is', message)
      }
    }
  })
}

/** Check if db connection is working or not by querying db. */
export const verifyDbConnection = async () => {
  try {
    logger.info('resolving db connection...')
    const knex = getKnexConnection();

    return knex.raw('select 1+1 as result').then(() => logger.info('connected established')).catch((err: any) => {
      logger.error(`Failed to connect database with error: ${err?.message}`)
      logger.warn('service shutting down...')

      process.exit(1);
    })
  } catch (error) {
    console.error('failed to connect to db')
    process.exit(1);
  }
}
