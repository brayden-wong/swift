import {
  HEALTH_CHECK,
  LOGIN,
  REFRESH_TOKENS,
  REGISTER,
  VALIDATE_USER,
} from "@app/common/constants";
import {
  LoginUserDto,
  RefreshTokenDto,
  RegisterUserDto,
} from "@app/common/dto";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AuthService } from "./services";
import { WebOrMobile } from "@app/common/types";
import { HealthCheck } from "@app/common/return_types";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(HEALTH_CHECK)
  getHealthCheck(): HealthCheck {
    return {
      name: "Auth Microservice",
      status: "ok",
    };
  }

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

  @MessagePattern(REFRESH_TOKENS)
  async refreshTokens(@Payload() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }
}
