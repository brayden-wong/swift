import { AUTH_CONTROLLER, LOGIN, REGISTER } from "@app/common/constants";
import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { GatewayAuthService } from "./gateway.auth.service";
import { Public, Sub } from "@app/common/decorators";
import { LocalGuard } from "@app/common/guards";
import {
  type RegisterUserDto,
  RegistrationValidationSchema,
} from "@app/common/dto";
import type { WebOrMobile } from "@app/common/types";

@Controller(AUTH_CONTROLLER)
export class GatewayAuthController {
  constructor(private readonly authService: GatewayAuthService) {}

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
}
