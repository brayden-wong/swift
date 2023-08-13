import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom, map } from "rxjs";
import { compareSync } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { REGISTER, USERS_SERVICE, VALIDATE_USER } from "@app/common/constants";
import type { LoginUserDto, RegisterUserDto } from "@app/common/dto";
import {
  GetUserById,
  type GeneratedTokens,
  type RegisterUser,
  type ValidateUser,
} from "@app/common/return_types";
import { SessionsService } from "./sessions.service";
import { Database, InjectDrizzle } from "@app/common/modules";
import { GET_USER_BY_ID } from "@app/common/constants/routes/users";

@Injectable()
export class AuthService {
  constructor(
    private readonly sessionsService: SessionsService,
    @Inject(ConfigService) private readonly config: ConfigService,
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
  ) {}

  registerUser(registerUserDto: RegisterUserDto) {
    return this.usersClient.send<RegisterUser, RegisterUserDto>(
      REGISTER,
      registerUserDto,
    );
  }

  async login(data: { sub: string; type: "web" | "mobile" }) {
    const validSession = await this.sessionsService.validateSession(
      data.type,
      data.sub,
    );

    const { accessToken, refreshToken } = await this.generateTokens({
      sub: data.sub,
    });

    const session = validSession
      ? await this.sessionsService.updateSessionLogin({
          type: data.type,
          userId: data.sub,
          newRefreshToken: refreshToken,
        })
      : await this.sessionsService.createSession({
          type: data.type,
          userId: data.sub,
          refreshToken,
        });

    if (!session)
      throw new HttpException(
        "Failed to create session",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const user = await firstValueFrom(
      this.usersClient.send<GetUserById, { id: string }>(GET_USER_BY_ID, {
        id: data.sub,
      }),
    );

    return { accessToken, refreshToken, user };
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
