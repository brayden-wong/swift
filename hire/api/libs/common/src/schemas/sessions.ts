import { relations, sql } from "drizzle-orm";
import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";

export const SessionTypeEnum = pgEnum("session_type", ["web", "mobile"]);

export const SessionsTable = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  type: SessionTypeEnum("type").notNull(),

  refreshToken: text("refresh_token").notNull(),
  expiration: timestamp("expiration").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const SessionsRelations = relations(SessionsTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [SessionsTable.userId],
    references: [UsersTable.id],
  }),
}));
