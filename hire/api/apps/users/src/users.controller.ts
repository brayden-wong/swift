import { Controller } from "@nestjs/common";
import { UsersService } from "./users.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { REGISTER, VALIDATE_USER } from "@app/common/constants";
import { RegisterUserDto } from "@app/common/dto";
import {
  GET_USER_BY_EMAIL,
  GET_USER_BY_ID,
  GET_USER_PUBLIC_CREDENTIALS,
} from "@app/common/constants/routes/users";

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(REGISTER)
  async registerUser(@Payload() registerUserDto: RegisterUserDto) {
    return this.usersService.registerUser(registerUserDto);
  }

  @MessagePattern(GET_USER_BY_ID)
  async getUserById(@Payload("id") id: string) {
    return this.usersService.getUserById(id);
  }

  @MessagePattern(GET_USER_BY_EMAIL)
  async getUserByEmail(@Payload("email") email: string) {
    return this.usersService.getUserByEmail(email);
  }

  @MessagePattern(VALIDATE_USER)
  async validateUser(@Payload("email") email: string) {
    return this.usersService.validateUser(email);
  }

  @MessagePattern(GET_USER_PUBLIC_CREDENTIALS)
  async getUserPublicCredentials(@Payload("email") email: string) {
    return await this.usersService.getPublicCredentials(email);
  }
}
