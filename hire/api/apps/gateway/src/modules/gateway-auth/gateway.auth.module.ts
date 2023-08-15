import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { GatewayAuthController } from "./gateway.auth.controller";
import { GatewayAuthService } from "./gateway.auth.service";

import { AUTH_SERVICE } from "@app/common/constants";
import { InjectConfig } from "@app/common/utils";
import { AtGuard, LocalGuard, RtGuard } from "@app/common/guards";
import { AtStrategy, LocalStrategy, RtStrategy } from "@app/common/strategies";

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
  controllers: [GatewayAuthController],
  providers: [
    GatewayAuthService,
    LocalStrategy,
    LocalGuard,
    AtStrategy,
    AtGuard,
    RtStrategy,
    RtGuard,
  ],
})
export class GatewayAuthModule {}
