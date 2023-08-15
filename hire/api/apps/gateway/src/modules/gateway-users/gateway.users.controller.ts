import { USERS_CONTROLLER } from "@app/common/constants/routes/users";
import {
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
} from "@nestjs/common";
import { GatewayUsersService } from "./gateway.users.service";
import { Public } from "@app/common/decorators";

@Controller(USERS_CONTROLLER)
export class GatewayUsersController {
  constructor(private readonly usersService: GatewayUsersService) {}

  @Public()
  @HttpCode(200)
  @Post("me")
  async getUserPublicCredentials(@Body("email") email: string) {
    const result = await this.usersService.getUserPublicCredentials(email);

    return result ? result : "no user found";
  }
}
