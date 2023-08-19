import { WebOrMobile } from "./web.or.mobile";

export type Token = {
  sub: string;
  type: WebOrMobile;
  iat: number;
  exp: number;
};

export type RefreshToken = {
  rt: string;
  type: WebOrMobile;
  sub: string;
  iat: number;
  exp: number;
};
