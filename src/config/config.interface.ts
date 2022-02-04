interface Configuration {
  port: number;

  nodeEnv: string;

  logLevel: string;

  db: {
    type: string;
    host: string;
    port: string | number;
    username: string;
    password: string;
    database: string;
  };

  knex: any;
}

export default Configuration;
