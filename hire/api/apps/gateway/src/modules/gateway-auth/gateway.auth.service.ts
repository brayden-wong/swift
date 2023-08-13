import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

import { AUTH_SERVICE, LOGIN, REGISTER } from "@app/common/constants";
import type { RegisterUserDto } from "@app/common/dto";
import { GeneratedTokens, type RegisterUser } from "@app/common/return_types";
import { WebOrMobile } from "@app/common/types";

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

  login(data: { sub: string; type: WebOrMobile }) {
    return this.authClient.send<
      GeneratedTokens,
      { sub: string; type: WebOrMobile }
    >(LOGIN, data);
  }
}
