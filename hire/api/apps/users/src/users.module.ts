import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { ConfigModule } from "@nestjs/config";
import { DrizzleModule } from "@app/common/modules";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./apps/users/.env.local.${process.env.NODE_ENV}`,
    }),
    DrizzleModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
