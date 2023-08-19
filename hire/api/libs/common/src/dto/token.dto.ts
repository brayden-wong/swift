import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const accessTokenSchema = z.object({
  sub: z.string(),
  type: z.union([z.literal("web"), z.literal("mobile")]),
  iat: z.number(),
  exp: z.number(),
});

const refreshTokenSchema = z.object({
  sub: z.string(),
  type: z.union([z.literal("web"), z.literal("mobile")]),
  iat: z.number(),
  exp: z.number(),
  rt: z.string(),
});

export class AccessTokenDto extends createZodDto(accessTokenSchema) {
  sub: string;
  type: "web" | "mobile";
  iat: number;
  exp: number;
}

export class RefreshTokenDto extends createZodDto(refreshTokenSchema) {
  sub: string;
  type: "web" | "mobile";
  rt: string;
}
