import {
  AUTH_CONTROLLER,
  HEALTH_CHECK,
  LOGIN,
  REFRESH_TOKENS,
  REGISTER,
} from "@app/common/constants";
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { GatewayAuthService } from "./gateway.auth.service";
import { CurrentUser, Public, Sub } from "@app/common/decorators";
import { LocalGuard, RtGuard } from "@app/common/guards";
import {
  type RegisterUserDto,
  RegistrationValidationSchema,
} from "@app/common/dto";
import type { RefreshToken, WebOrMobile } from "@app/common/types";
import type { Observable } from "rxjs";
import type { HealthCheck } from "@app/common/return_types";

@Controller(AUTH_CONTROLLER)
export class GatewayAuthController {
  constructor(private readonly authService: GatewayAuthService) {}

  @Public()
  @Get(HEALTH_CHECK)
  getHealthCheck(): Observable<HealthCheck> {
    return this.authService.getHealthCheck();
  }

  @Public()
  @UsePipes(RegistrationValidationSchema)
  @Post(REGISTER)
  async registerUser(
    @Body()
    registerUserDto: RegisterUserDto,
  ) {
    return await this.authService.sendRegisterUserMessage(registerUserDto);
  }

  @Public()
  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post(LOGIN)
  login(@Sub() { sub }: { sub: string }, @Body("type") type: WebOrMobile) {
    return this.authService.login({ sub, type });
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(200)
  @Post(REFRESH_TOKENS)
  async refreshTokens(
    @CurrentUser({ user: "RefreshToken" }) { sub, type, rt }: RefreshToken,
  ) {
    return this.authService.refreshTokens({
      sub,
      type,
      rt,
    });
  }
}
