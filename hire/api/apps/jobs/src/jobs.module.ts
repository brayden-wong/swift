import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DrizzleModule } from "@app/common/modules";
import { JobsController, SkillsController } from "./controllers";
import { JobsService, SkillsService } from "./services";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.local.${process.env.NODE_ENV}`,
    }),
    DrizzleModule,
  ],
  controllers: [JobsController, SkillsController],
  providers: [JobsService, SkillsService],
})
export class JobsModule {}
