// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export const postgresConf = {
  POSTGRES_TYPE: 'postgres',
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT),
  POSTGRES_SYNC: process.env.POSTGRES_SYNC,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_POOL_MAX_CONN: parseInt(process.env.POSTGRES_POOL_MAX_CONN),
  POSTGRES_NAME: process.env.POSTGRES_DATABASE_NAME,
  LOG_LEVEL: process.env.POSTGRES_LOG_LEVEL,
};
