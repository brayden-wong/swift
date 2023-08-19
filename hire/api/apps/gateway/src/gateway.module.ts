import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GatewayAuthModule, GatewayUsersModule } from "./modules";
import { GatewayJobsModule } from "./modules/gateway-jobs/gateway.jobs.module";
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "@app/common/guards";
import { GatewayController } from "./gateway.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./apps/gateway/.env.local.${process.env.NODE_ENV}`,
    }),
    GatewayAuthModule,
    GatewayJobsModule,
    GatewayUsersModule,
  ],
  controllers: [GatewayController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class GatewayModule {}
