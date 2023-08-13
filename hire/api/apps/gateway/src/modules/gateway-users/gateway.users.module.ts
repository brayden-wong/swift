import { USERS_SERVICE } from "@app/common/constants";
import { InjectConfig } from "@app/common/utils";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { GatewayUsersController } from "./gateway.users.controller";
import { GatewayUsersService } from "./gateway.users.service";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        ...InjectConfig(USERS_SERVICE),
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get("USERS_HOST"),
            port: config.get<number>("USERS_PORT"),
          },
        }),
      },
    ]),
  ],
  controllers: [GatewayUsersController],
  providers: [GatewayUsersService],
})
export class GatewayUsersModule {}
