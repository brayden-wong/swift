import { Module } from "@nestjs/common";
<<<<<<< HEAD
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AUTH_SERVICE } from "@app/common/constants";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
=======
import { ConfigModule } from "@nestjs/config";
import { GatewayAuthModule } from "./modules";
console.log(process.env.NODE_ENV);

@Module({
  imports: [
    GatewayAuthModule,
>>>>>>> api-main
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./apps/gateway/.env.local.${process.env.NODE_ENV}`,
    }),
<<<<<<< HEAD
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
=======
>>>>>>> api-main
  ],
})
export class GatewayModule {}
