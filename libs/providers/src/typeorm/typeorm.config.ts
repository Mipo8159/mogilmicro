import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
import { ConfigService } from '@nestjs/config';

export const dataSourceOptions = (
  configService: ConfigService,
): DataSourceOptions => {
  const url = configService.get<string>('DATABASE_URL');
  if (!url) {
    throw new Error('Database URL is empty');
  }

  return {
    url,
    type: 'postgres',
    schema: 'public',
    logging: configService.get<string>('NODE_ENV') === 'development',
    entities: [resolve('dist', 'libs', 'entities', '**', '*.entity.js')],
    migrations: [resolve('dist', 'migrations', '**', '*migration.js')],
    migrationsRun: true,
    migrationsTableName: 'migrations',
  };
};

config({ path: resolve('.env') });
const configService = new ConfigService();
export const appDataSource = new DataSource(dataSourceOptions(configService));
