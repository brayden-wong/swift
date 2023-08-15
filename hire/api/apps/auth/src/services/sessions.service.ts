import { Database, InjectDrizzle } from "@app/common/modules";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { CreateSessionDto, UpdateSessionLoginDto } from "@app/common/dto";

import { compare, hash } from "bcryptjs";
import { SessionsTable } from "@app/common/schemas";
import { and, eq, sql } from "drizzle-orm";
import { WebOrMobile } from "@app/common/types";

@Injectable()
export class SessionsService {
  constructor(@InjectDrizzle() private readonly db: Database) {}

  async createSession(createSessionDto: CreateSessionDto) {
    const { refreshToken, ...sessionData } = createSessionDto;
    const expiration = await this.generateExpiration();

    return this.db.insert(SessionsTable).values({
      ...sessionData,
      refreshToken: await hash(refreshToken, 10),
      expiration,
    });
  }

  async updateSessionLogin({
    type,
    newRefreshToken,
    userId,
  }: UpdateSessionLoginDto) {
    const result = await this.db.query.SessionsTable.findFirst({
      where: (SessionsTable, { and, eq }) =>
        and(eq(SessionsTable.userId, userId), eq(SessionsTable.type, type)),
    });

    if (!result) throw new UnauthorizedException("Invalid Session");

    const expiration = await this.generateExpiration();
    const newRefreshTokenHash = await hash(newRefreshToken, 10);

    const [updatedSession] = await this.db
      .update(SessionsTable)
      .set({
        refreshToken: newRefreshTokenHash,
        expiration,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(
        and(eq(SessionsTable.userId, userId), eq(SessionsTable.type, type)),
      )
      .returning();

    return updatedSession;
  }

  async updateRefreshToken(
    userId: string,
    type: WebOrMobile,
    refreshToken: string,
  ) {
    const hashedToken = await hash(refreshToken, 10);
    const expiration = await this.generateExpiration();
    await this.db
      .update(SessionsTable)
      .set({
        refreshToken: hashedToken,
        expiration,
        updatedAt: sql`CURRENT_TIMESTAMP`,
      })
      .where(
        and(eq(SessionsTable.userId, userId), eq(SessionsTable.type, type)),
      );
  }

  async validateSession(type: "web" | "mobile", userId: string) {
    const session = await this.db.query.SessionsTable.findFirst({
      where: and(
        eq(SessionsTable.type, type),
        eq(SessionsTable.userId, userId),
      ),
    });

    if (session && session.expiration < new Date()) return false;

    return session ? true : false;
  }

  async validateRefreshToken(
    refreshToken: string,
    type: WebOrMobile,
    userId: string,
  ) {
    const session = await this.db.query.SessionsTable.findFirst({
      where: and(
        eq(SessionsTable.userId, userId),
        eq(SessionsTable.type, type),
      ),
    });

    if (!session) throw new UnauthorizedException("Invalid Session");

    return await compare(refreshToken, session.refreshToken);
  }

  private async generateExpiration() {
    return new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
  }
}
