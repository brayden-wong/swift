import { GetUserById } from "./user";

export type Login = {
  readonly accessToken: string;
  readonly refreshToken: string;
  user: GetUserById;
};

export type GeneratedTokens = {
  readonly accessToken: string;
  readonly refreshToken: string;
};
