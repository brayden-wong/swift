import { Injectable } from "@nestjs/common";
import { Database, InjectDrizzle } from "@app/common/modules";
import { hash } from "bcryptjs";
import { ProfileTable, UsersTable } from "@app/common/schemas";

import { RegisterUserDto } from "@app/common/dto";
import {
  GetUserByEmail,
  GetUserById,
  PublicCredentials,
  RegisterUser,
  ValidateUser,
} from "@app/common/return_types";
import { eq } from "drizzle-orm";

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

    await this.db.insert(ProfileTable).values({ userId: user.id });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };
  }

  async getUserByEmail(email: string): Promise<GetUserByEmail> {
    const user = await this.db.query.UsersTable.findFirst({
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
      with: {
        profile: true,
      },
    });

    return user;
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
      with: {
        profile: true,
      },
    });

    if (!user) return null;

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
