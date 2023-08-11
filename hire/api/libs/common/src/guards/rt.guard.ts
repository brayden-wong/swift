import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RT } from "@app/common/constants";

@Injectable()
export class RtGuard extends AuthGuard(RT) {
  constructor() {
    super();
  }
}
