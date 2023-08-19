import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AT } from "@app/common/constants/guards";
import type { Token } from "@app/common/types";
import { GET_USER_BY_ID, USERS_SERVICE } from "../constants";
import { ClientProxy } from "@nestjs/microservices";
import { GetUserById } from "../return_types";
import { firstValueFrom, map } from "rxjs";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, AT) {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersClient: ClientProxy,
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>("AT_SECRET"),
    });
  }

  async validate(payload: Token) {
    if (payload.sub === undefined)
      throw new UnauthorizedException("Invalid token");

    return await firstValueFrom(
      this.usersClient
        .send<GetUserById, { id: string }>(GET_USER_BY_ID, {
          id: payload.sub,
        })
        .pipe(
          map((user) => {
            console.log(user);

            return payload.sub === user.id ? payload : null;
          }),
        ),
    );
  }
}
