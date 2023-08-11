import { RegisterUserDto } from "@app/common/dto";
import { Database, InjectDrizzle } from "@app/common/modules";
import { UsersTable } from "@app/common/schemas";
import { Injectable } from "@nestjs/common";

import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    let { email, password, ...restOfUserData } = registerUserDto;
    email = email.toLowerCase();
    password = await bcrypt.hash(password, 10);

    const user = await this.db
      .insert(UsersTable)
      .values({
        ...restOfUserData,
        email,
        password,
      })
      .returning({ id: UsersTable.id });

    return user;
  }
}
