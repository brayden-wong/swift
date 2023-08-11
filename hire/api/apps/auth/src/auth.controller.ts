import { REGISTER } from "@app/common/constants";
import { RegisterUserDto } from "@app/common/dto";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(REGISTER)
  async registerUser(@Payload() registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    return this.authService.registerUser(registerUserDto);
  }
}
