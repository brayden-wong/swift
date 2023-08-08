import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { type Database, DrizzleConfig } from './drizzle.types';
import { getDrizzleToken } from './drizzle.constants';

import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '@app/common/schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
  ],
  providers: [
    {
      provide: getDrizzleToken(),
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const dbConfig = {
          url: config.get<string>('DATABASE_URL'),
          options: {
            schema,
            logger: config.get<string>('NODE_ENV') === 'dev',
          },
        } satisfies DrizzleConfig;

        neonConfig.fetchConnectionCache = true;
        const sql = neon(dbConfig.url);

        return drizzle(sql, dbConfig.options);
      },
    },
  ],
})
export class DrizzleModule {}
