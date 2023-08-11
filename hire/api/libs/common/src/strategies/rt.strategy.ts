import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";

import { RT } from "@app/common/constants/guards";
import type { Token } from "@app/common/types";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, RT) {
  constructor(
    @Inject(ConfigService)
    private readonly _config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: _config.get<string>("RT_SECRET"),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: Token) {
    const rt = req.headers.authorization.split(" ")[1];
    return {
      ...payload,
      rt,
    };
  }
}
