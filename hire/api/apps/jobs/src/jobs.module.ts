import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { DrizzleModule } from "@app/common/modules";
import { JobsController, SkillsController } from "./controllers";
import { JobsService, SkillsService } from "./services";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { InjectConfig } from "@app/common/utils";
import { USERS_SERVICE } from "@app/common/constants";

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
            host: config.get("USERS_HOST"),
            port: config.get("USERS_PORT"),
          },
        }),
      },
    ]),
    DrizzleModule,
  ],
  controllers: [JobsController, SkillsController],
  providers: [JobsService, SkillsService],
})
export class JobsModule {}
