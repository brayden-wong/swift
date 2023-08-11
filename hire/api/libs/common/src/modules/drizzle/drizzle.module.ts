import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { DrizzleConfig } from "./drizzle.types";
import {
  getDrizzleConfigToken,
  getDrizzleInstanceToken,
} from "./drizzle.constants";

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
        const client = new Client(drizzleConfig.url);

        await client.connect();

        return drizzle(client, drizzleConfig.options);
      },
    },
  ],
  exports: [getDrizzleInstanceToken()],
})
export class DrizzleModule {}
