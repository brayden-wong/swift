import { JOBS_SERVICE, SKILLS_SERVICE } from "@app/common/constants";
import { InjectConfig } from "@app/common/utils";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { GatewayJobsController, GatewaySkillsController } from "./controllers";
import { GatewayJobsService, GatewaySkillsService } from "./services";

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        ...InjectConfig(JOBS_SERVICE),
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>("JOBS_HOST"),
            port: config.get<number>("JOBS_PORT"),
          },
        }),
      },
      {
        ...InjectConfig(SKILLS_SERVICE),
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>("JOBS_HOST"),
            port: config.get<number>("JOBS_PORT"),
          },
        }),
      },
    ]),
  ],
  controllers: [GatewayJobsController, GatewaySkillsController],
  providers: [GatewayJobsService, GatewaySkillsService],
})
export class GatewayJobsModule {}
