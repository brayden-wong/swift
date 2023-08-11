import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";

export const Sub = createParamDecorator((_, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<Request>();

  return request.user;
});
