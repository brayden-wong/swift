import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { LOCAL } from "@app/common/constants";

@Injectable()
export class LocalGuard extends AuthGuard(LOCAL) {
  constructor() {
    super();
  }
}
