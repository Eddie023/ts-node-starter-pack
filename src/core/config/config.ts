import Configuration from './config.interface';

const config = (): Configuration => ({
  port: Number(process.env.PORT) || 8000,

  nodeEnv: process.env.NODE_ENV || 'dev',

  logLevel: process.env.LOG_LEVEL || 'info',

  db: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
  },
});

export default config;
