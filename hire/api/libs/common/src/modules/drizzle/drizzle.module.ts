import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { type Database, DrizzleConfig } from "./drizzle.types";
import {
  getDrizzleConfigToken,
  getDrizzleInstanceToken,
} from "./drizzle.constants";

import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@app/common/schemas";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
  ],
  providers: [
    {
      provide: getDrizzleConfigToken(),
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>
        ({
          url: config.get<string>("DATABASE_URL"),
          options: {
            schema,
            logger: config.get<string>("NODE_ENV") === "dev",
          },
        }) satisfies DrizzleConfig,
    },
    {
      provide: getDrizzleInstanceToken(),
      inject: [getDrizzleConfigToken()],
      useFactory: async (drizzleConfig: DrizzleConfig) => {
        neonConfig.fetchConnectionCache = true;
        const sql = neon(drizzleConfig.url);

        return drizzle(sql, drizzleConfig.options);
      },
    },
  ],
  exports: [getDrizzleInstanceToken()],
})
export class DrizzleModule {}
