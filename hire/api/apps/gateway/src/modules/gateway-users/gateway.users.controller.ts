import { USERS_CONTROLLER } from "@app/common/constants/routes/users";
import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { GatewayUsersService } from "./gateway.users.service";
import { Public } from "@app/common/decorators";

@Controller(USERS_CONTROLLER)
export class GatewayUsersController {
  constructor(private readonly usersService: GatewayUsersService) {}

  @Public()
  @HttpCode(200)
  @Post("public/credentials")
  async getUserPublicCredentials(@Body("email") email: string) {
    console.log("endpoint hit");
    return await this.usersService.getUserPublicCredentials(email);
  }
}
