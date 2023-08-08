import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { DrizzleModule } from '@app/common/modules/drizzle/drizzle.module';
import { DrizzleConfig } from '@app/common/modules/drizzle/drizzle.types';

import * as schema from '@app/common/schema';
import { drizzle } from 'drizzle-orm/node-postgres';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.local.${process.env.NODE_ENV}`,
    }),
    DrizzleModule,
  ],
})
export class AuthAppModule {}
