import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_SERVICE } from "@app/common/constants";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./apps/gateway/.env.local.${process.env.NODE_ENV}`,
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
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
})
export class GatewayModule {}
