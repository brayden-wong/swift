import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

import { AUTH_SERVICE, REGISTER } from "@app/common/constants";
import type { RegisterUserDto } from "@app/common/dto";

@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}

  async getRegisterUserResponse(registerUserDto: RegisterUserDto) {
    return await firstValueFrom(
      this.authClient.send<any, RegisterUserDto>(REGISTER, registerUserDto),
    );
  }
}
