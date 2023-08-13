import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GatewayAuthModule, GatewayUsersModule } from "./modules";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./apps/gateway/.env.local.${process.env.NODE_ENV}`,
    }),
    GatewayAuthModule,
    GatewayUsersModule,
  ],
})
export class GatewayModule {}
