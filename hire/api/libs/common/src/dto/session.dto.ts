import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const createSessionSchema = z.object({
  type: z.literal("web").or(z.literal("mobile")),
  refreshToken: z.string(),
  expiration: z.date(),
  userId: z.string(),
});

export class CreateSessionDto extends createZodDto(createSessionSchema) {
  type: "web" | "mobile";
  refreshToken: string;
  userId: string;
}

export class UpdateSessionLoginDto {
  type: "web" | "mobile";
  userId: string;

  newRefreshToken: string;
}
