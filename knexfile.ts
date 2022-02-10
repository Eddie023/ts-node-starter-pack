require('ts-node/register');

import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgres',
    pool: {
      min: 2,
      max: 10
    },
    connection: {
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: 'todo_admin',
      password: 'todo123',
      database: 'todo_db'
    },
    migrations: {
      extension: 'ts',
      tableName: "migrations",
      directory: "./src/app/db/migrations",
      stub: './src/config/stubs/migration.stub.ts',
    }
  }
};

module.exports = config;
