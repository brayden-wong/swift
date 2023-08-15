import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const refreshTokenSchema = z.object({
  sub: z.string(),
  type: z.union([z.literal("web"), z.literal("mobile")]),
  rt: z.string(),
});

export class RefreshTokenDto extends createZodDto(refreshTokenSchema) {
  sub: string;
  type: "web" | "mobile";
  rt: string;
}
