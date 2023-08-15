import { Body, Controller, Get, HttpCode, Post } from "@nestjs/common";
import { USERS_CONTROLLER } from "@app/common/constants/routes/users";
import { GatewayUsersService } from "./gateway.users.service";
import { Public } from "@app/common/decorators";
import { HEALTH_CHECK } from "@app/common/constants";
import type { Observable } from "rxjs";
import type { HealthCheck } from "@app/common/return_types";

@Controller(USERS_CONTROLLER)
export class GatewayUsersController {
  constructor(private readonly usersService: GatewayUsersService) {}

  @Public()
  @Get(HEALTH_CHECK)
  getHealthCheck(): Observable<HealthCheck> {
    return this.usersService.getHealthCheck();
  }

  @Public()
  @HttpCode(200)
  @Post("me")
  async getUserPublicCredentials(@Body("email") email: string) {
    const result = await this.usersService.getUserPublicCredentials(email);

    return result ? result : "no user found";
  }
}
