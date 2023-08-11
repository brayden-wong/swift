import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AUTH_CONTROLLER, LOCAL, VALIDATE_USER } from "@app/common/constants";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL) {
  constructor(
    @Inject(AUTH_CONTROLLER) private readonly authClient: ClientProxy,
  ) {
    super({});
  }

  async validate(username: string, password: string) {
    const user = await firstValueFrom(
      this.authClient.send<
        { id: string },
        { username: string; password: string }
      >(VALIDATE_USER, { username, password }),
    );

    if (!user)
      throw new HttpException("Invalid Credentials", HttpStatus.UNAUTHORIZED);
    return { id: user.id };
  }
}
