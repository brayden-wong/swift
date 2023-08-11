import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules";
console.log(process.env.NODE_ENV);

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./apps/gateway/.env.local.${process.env.NODE_ENV}`,
    }),
  ],
})
export class GatewayModule {}
