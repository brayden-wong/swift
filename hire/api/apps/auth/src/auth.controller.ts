import {
  GENERATE_TOKENS,
  REGISTER,
  VALIDATE_USER,
} from "@app/common/constants";
import { LoginUserDto, RegisterUserDto } from "@app/common/dto";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

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

  @MessagePattern(GENERATE_TOKENS)
  async generateTokens(@Payload() sub: { sub: string }) {
    return this.authService.generateTokens(sub);
  }
}
