import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Client } from "pg";
import { drizzle } from "drizzle-orm/neon-http";
import { neon, neonConfig } from "@neondatabase/serverless";
import { DrizzleConfig } from "./drizzle.types";
import {
  getDrizzleConfigToken,
  getDrizzleInstanceToken,
} from "./drizzle.constants";

// import ws from "ws";
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
          url: `postgres://${config.get<string>(
            "DATABASE_USER",
          )}:${config.get<string>("DATABASE_PASSWORD")}@${config.get<string>(
            "DATABASE_HOST",
          )}/${config.get<string>(
            "DATABASE_NAME",
          )}?ssl=true&options=project%3D${config.get<string>("ENDPOINT_ID")}`,
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
