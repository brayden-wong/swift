import { z } from "nestjs-zod/z";
import { ZodValidationPipe, createZodDto } from "nestjs-zod";

const RegistrationSchema = z.object({
  name: z.string().nonempty().min(3).max(255),
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8).max(255),
  avatar: z.string().optional(),
  role: z
    .literal("standard_user")
    .or(z.literal("company_user"))
    .optional()
    .default("standard_user"),
  boosts: z.number().optional().default(3),
  isActive: z.boolean().optional().default(true),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  deletedAt: z.date().optional(),
});

export const RegistrationValidationSchema = new ZodValidationPipe(
  RegistrationSchema,
);
export class RegisterUserDto extends createZodDto(RegistrationSchema) {
  name: string;
  email: string;
  password: string;
}
