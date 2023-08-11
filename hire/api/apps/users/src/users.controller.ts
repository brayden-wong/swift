import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { REGISTER } from "@app/common/constants";
import { RegisterUserDto } from "@app/common/dto";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(REGISTER)
  async registerUser(@Payload() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto);
  }
}
