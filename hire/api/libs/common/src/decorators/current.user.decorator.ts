import { AccessTokenDto, User } from "@app/common/dto";
import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import type { RefreshToken } from "../types";

export const CurrentToken = createParamDecorator(
  (
    data: {
      user: "AccessToken" | "RefreshToken";
      key?: keyof User | keyof RefreshToken;
    } = { user: "AccessToken", key: null },
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest<Request>();

    if (data.user === "AccessToken") {
      const user = request.user as AccessTokenDto;
      const key = data.key as keyof AccessTokenDto;

      return data.key ? user[key] : user;
    }

    if (data.user === "RefreshToken") {
      const user = request.user as RefreshToken;
      const key = data.key as keyof RefreshToken;

      return data.key ? user[key] : user;
    }
  },
);
