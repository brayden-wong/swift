import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { Database, InjectDrizzle } from "@app/common/modules";
import { REGISTER, USERS_SERVICE } from "@app/common/constants";
import { RegisterUserDto } from "@app/common/dto";
import { map } from "rxjs";

@Injectable()
export class AuthService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
    @InjectDrizzle() private readonly db: Database,
  ) {}

  registerUser(registerUserDto: RegisterUserDto) {
    console.log(registerUserDto);
    const response = this.usersClient
      .send<any, RegisterUserDto>(REGISTER, registerUserDto)
      .pipe(
        map((res) => {
          console.log(res);
          return res;
        }),
      );

    return response;
  }
}
