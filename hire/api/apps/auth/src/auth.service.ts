import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";
import { compareSync } from "bcryptjs";

import { Database, InjectDrizzle } from "@app/common/modules";
import { REGISTER, USERS_SERVICE, VALIDATE_USER } from "@app/common/constants";
import type { LoginUserDto, RegisterUserDto } from "@app/common/dto";
import type {
  GeneratedTokens,
  RegisterUser,
  ValidateUser,
} from "@app/common/return_types";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
    @InjectDrizzle() private readonly db: Database,
  ) {}

  registerUser(registerUserDto: RegisterUserDto) {
    return this.usersClient.send<RegisterUser, RegisterUserDto>(
      REGISTER,
      registerUserDto,
    );
  }

  validateUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    return this.usersClient
      .send<ValidateUser, Pick<LoginUserDto, "email">>(VALIDATE_USER, {
        email,
      })
      .pipe(
        map((user) => {
          if (!user) return null;

          if (!compareSync(password, user.password)) return null;

          return { sub: user.id };
        }),
      );
  }

  async generateTokens(sub: { sub: string }): Promise<GeneratedTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(sub, {
        secret: this.config.get<string>("AT_SECRET"),
        expiresIn: this.config.get<string>("AT_EXPIRES_IN"),
      }),
      this.jwtService.sign(sub, {
        secret: this.config.get<string>("RT_SECRET"),
        expiresIn: this.config.get<string>("RT_EXPIRES_IN"),
      }),
    ]);

    return { accessToken, refreshToken } as const;
  }
}
