import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AT } from "@app/common/constants/guards";
import type { Token } from "@app/common/types";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, AT) {
  constructor(
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
    return payload;
  }
}
