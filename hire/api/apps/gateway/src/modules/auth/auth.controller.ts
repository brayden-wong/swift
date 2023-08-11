import { AUTH_CONTROLLER } from "@app/common/constants";
import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "@app/common/decorators";
import { RegisterUserDto, RegistrationValidationSchema } from "@app/common/dto";

@Controller(AUTH_CONTROLLER)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UsePipes(RegistrationValidationSchema)
  @Post("register")
  async registerUser(
    @Body()
    registerUserDto: RegisterUserDto,
  ) {
    return await this.authService.getRegisterUserResponse(registerUserDto);
  }
}
