import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { postgresConf } from '../config';

export const entityFolder = join(__dirname, '../entities/**/*.entity.{ts,js}');
export const migrationFolder = join(__dirname, '../migrations/**/*.{ts,js}');

export const ormConfig: DataSourceOptions = {
  replication: {
    master: {
      host: postgresConf.POSTGRES_HOST,
      port: postgresConf.POSTGRES_PORT,
      username: postgresConf.POSTGRES_USERNAME,
      password: postgresConf.POSTGRES_PASSWORD,
      database: postgresConf.POSTGRES_NAME,
    },
    slaves: [],
  },
  type: postgresConf.POSTGRES_TYPE as any,
  entities: [entityFolder],
  migrations: [migrationFolder],
  migrationsTableName: 'migrations',
  synchronize: !!postgresConf.POSTGRES_SYNC,
  logging: true,
  logger: postgresConf.LOG_LEVEL as any,
  poolSize: postgresConf.POSTGRES_POOL_MAX_CONN,
};

export const PGProviderToken = 'PG_DATASOURCE';
export const PGDataSource = new DataSource(ormConfig);
