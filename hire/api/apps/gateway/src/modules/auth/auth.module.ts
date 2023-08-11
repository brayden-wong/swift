import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

import { AUTH_SERVICE } from "@app/common/constants";
import { InjectConfig } from "@app/common/utils";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        ...InjectConfig(AUTH_SERVICE),
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get("AUTH_HOST"),
            port: config.get<number>("AUTH_PORT"),
          },
        }),
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
