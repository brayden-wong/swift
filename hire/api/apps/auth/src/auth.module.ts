import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { AuthController } from "./auth.controller";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { InjectConfig } from "@app/common/utils";
import { USERS_SERVICE } from "@app/common/constants";
import { DrizzleModule } from "@app/common/modules";
import { AuthService } from "./auth.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.local.${process.env.NODE_ENV}`,
    }),
    ClientsModule.registerAsync([
      {
        ...InjectConfig(USERS_SERVICE),
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>("USERS_HOST"),
            port: config.get<number>("USERS_PORT"),
          },
        }),
      },
    ]),
    DrizzleModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
