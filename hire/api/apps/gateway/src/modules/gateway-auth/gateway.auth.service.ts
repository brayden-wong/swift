import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

import { AUTH_SERVICE, GENERATE_TOKENS, REGISTER } from "@app/common/constants";
import type { RegisterUserDto } from "@app/common/dto";
import { GeneratedTokens, type RegisterUser } from "@app/common/return_types";

@Injectable()
export class GatewayAuthService {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  async sendRegisterUserMessage(registerUserDto: RegisterUserDto) {
    return await firstValueFrom(
      this.authClient.send<RegisterUser, RegisterUserDto>(
        REGISTER,
        registerUserDto,
      ),
    );
  }

  getGeneratedTokens(sub: { sub: string }) {
    return this.authClient.send<GeneratedTokens, { sub: string }>(
      GENERATE_TOKENS,
      sub,
    );
  }
}
