import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { REGISTER, VALIDATE_USER } from "@app/common/constants";
import { RegisterUserDto } from "@app/common/dto";
import { GET_USER_BY_EMAIL } from "@app/common/constants/routes/users";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(REGISTER)
  async registerUser(@Payload() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto);
  }

  @MessagePattern(GET_USER_BY_EMAIL)
  async getUserByEmail(@Payload("email") email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @MessagePattern(VALIDATE_USER)
  async validateUser(@Payload("email") email: string) {
    return this.usersService.validateUser(email);
  }
}
