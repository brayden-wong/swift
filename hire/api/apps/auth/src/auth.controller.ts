import { LOGIN, REGISTER, VALIDATE_USER } from "@app/common/constants";
import { LoginUserDto, RegisterUserDto } from "@app/common/dto";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./services";
import { WebOrMobile } from "@app/common/types";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(REGISTER)
  registerUser(@Payload() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @MessagePattern(VALIDATE_USER)
  validateUser(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.validateUser(loginUserDto);
  }

  @MessagePattern(LOGIN)
  async generateTokens(@Payload() data: { sub: string; type: WebOrMobile }) {
    return this.authService.login(data);
  }
}
