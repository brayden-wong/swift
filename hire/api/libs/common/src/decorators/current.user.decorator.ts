import { User } from "@app/common/dto";
import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import { RefreshToken } from "../types";

export const CurrentUser = createParamDecorator(
  (
    data: {
      user: "User" | "RefreshToken";
      key?: keyof User | keyof RefreshToken;
    } = { user: "User", key: null },
    context: ExecutionContext,
  ) => {
    const request = context.switchToHttp().getRequest<Request>();

    if (data.user === "User") {
      const user = request.user as User;
      const key = data.key as keyof User;

      return data.key ? user[key] : user;
    }

    if (data.user === "RefreshToken") {
      const user = request.user as RefreshToken;
      const key = data.key as keyof RefreshToken;

      return data.key ? user[key] : user;
    }
  },
);
