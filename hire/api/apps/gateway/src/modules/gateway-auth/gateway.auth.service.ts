import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { type Observable, firstValueFrom } from "rxjs";

import {
  AUTH_SERVICE,
  HEALTH_CHECK,
  LOGIN,
  REFRESH_TOKENS,
  REGISTER,
} from "@app/common/constants";
import type { RefreshTokenDto, RegisterUserDto } from "@app/common/dto";
import {
  GeneratedTokens,
  HealthCheck,
  Login,
  type RegisterUser,
} from "@app/common/return_types";
import { WebOrMobile } from "@app/common/types";

@Injectable()
export class GatewayAuthService {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  getHealthCheck(): Observable<HealthCheck> {
    return this.authClient.send<HealthCheck, {}>(HEALTH_CHECK, {});
  }

  async sendRegisterUserMessage(registerUserDto: RegisterUserDto) {
    return await firstValueFrom(
      this.authClient.send<RegisterUser, RegisterUserDto>(
        REGISTER,
        registerUserDto,
      ),
    );
  }

  login(data: { sub: string; type: WebOrMobile }) {
    return this.authClient.send<Login, typeof data>(LOGIN, data);
  }

  refreshTokens(refreshTokenDto: RefreshTokenDto) {
    return this.authClient.send<GeneratedTokens, RefreshTokenDto>(
      REFRESH_TOKENS,
      refreshTokenDto,
    );
  }
}
