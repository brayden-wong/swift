import { Injectable, NotFoundException } from "@nestjs/common";
import { Database, InjectDrizzle } from "@app/common/modules";
import { hash } from "bcryptjs";
import { UsersTable } from "@app/common/schemas";

import { RegisterUserDto } from "@app/common/dto";
import {
  GetUserByEmail,
  GetUserById,
  PublicCredentials,
  RegisterUser,
  ValidateUser,
} from "@app/common/return_types";

@Injectable()
export class UsersService {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async registerUser(registerUserDto: RegisterUserDto): Promise<RegisterUser> {
    const { email, password, ...restOfUserData } = registerUserDto;

    const [user] = await this.db
      .insert(UsersTable)
      .values({
        ...restOfUserData,
        email: email.toLowerCase(),
        password: await hash(password, 10),
      })
      .returning();

    return {
      id: user.id,
      createdAt: user.createdAt,
    };
  }

  async getUserByEmail(email: string): Promise<GetUserByEmail> {
    return await this.db.query.UsersTable.findFirst({
      where: (UsersTable, { eq }) => eq(UsersTable.email, email.toLowerCase()),
      columns: {
        id: true,
        name: true,
        email: true,
        boosts: true,
        avatar: true,
        firstTimeLogin: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async validateUser(email: string): Promise<ValidateUser | null> {
    const user = await this.db.query.UsersTable.findFirst({
      where: (UsersTable, { eq }) => eq(UsersTable.email, email.toLowerCase()),
      columns: {
        id: true,
        password: true,
      },
    });

    return user ? user : null;
  }

  async getUserById(id: string): Promise<GetUserById> {
    const user = await this.db.query.UsersTable.findFirst({
      where: (UsersTable, { eq }) => eq(UsersTable.id, id),
    });

    if (!user) throw new NotFoundException("User does not exist");

    const { password, ...data } = user;

    return data;
  }

  async getPublicCredentials(email: string): Promise<PublicCredentials | null> {
    const user = await this.db.query.UsersTable.findFirst({
      where: (UsersTable, { eq }) => eq(UsersTable.email, email.toLowerCase()),
      columns: {
        id: true,
        name: true,
        email: true,
        avatar: true,
      },
    });

    return user ? user : null;
  }
}
