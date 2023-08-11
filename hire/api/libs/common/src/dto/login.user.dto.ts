import { ZodValidationPipe, createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";

const LoginSchema = z.object({
  email: z.string().nonempty().email(),
  password: z.string().nonempty().min(8).max(255),
});

export const LoginValidationSchema = new ZodValidationPipe(LoginSchema);

export class LoginUserDto extends createZodDto(LoginSchema) {
  constructor({ email, password }: LoginUserDto) {
    super();
    this.email = email;
    this.password = password;
  }
}
