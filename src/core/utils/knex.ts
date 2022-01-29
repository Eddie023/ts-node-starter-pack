import Knex from 'knex';
import { config } from '../config';

/** getKenxConnection initializes knex connection. */
export const getKnexConnection = (): any => {
  const { username, database, password } = config().db;

  return Knex({
    client: 'postgres',

    useNullAsDefault: true,

    connection: {
      userName: username,
      database: database,
      password: password,
      port: 5435,
      host: "127.0.0.1",
    }
  })
}
