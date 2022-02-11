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
        console.error('the error is', message);
      },
    },
  });
};

/** Check if db connection is working or not by querying db. */
export const initDatabase = async () => {
  logger.info('resolving db connection...');
  const knex = getKnexConnection();

  return knex.raw('SELECT 1+1 AS result');
};
