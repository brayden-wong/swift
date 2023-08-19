import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AUTH_SERVICE, LOCAL, VALIDATE_USER } from "@app/common/constants";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, map } from "rxjs";
import { LoginUserDto } from "../dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOCAL) {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string) {
    const loginUserDto = new LoginUserDto({ email, password });
    return await firstValueFrom(
      this.authClient
        .send<{ sub: string }, LoginUserDto>(VALIDATE_USER, loginUserDto)
        .pipe(
          map((user) => {
            if (!user) throw new UnauthorizedException("Invalid credentials");

            return user;
          }),
        ),
    );
  }
}
