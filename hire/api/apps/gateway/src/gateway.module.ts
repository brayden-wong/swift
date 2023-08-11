import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GatewayAuthModule } from "./modules";

@Module({
  imports: [
    GatewayAuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./apps/gateway/.env.local.${process.env.NODE_ENV}`,
    }),
  ],
})
export class GatewayModule {}
