import { relations, sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgEnum,
  pgTable,
  smallint,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { FilesTable } from "./files";
import { UsersAndApplicationsTable } from "./users.and.applications";
import { ProfileTable } from "./profile";

export const UsersRoleEnum = pgEnum("user_role", [
  "company_user",
  "standard_user",
]);

export const UsersTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),

    name: text("name").notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
    avatar: text("avatar"),

    boosts: smallint("boosts").notNull().default(3),
    isActive: boolean("is_active").notNull().default(true),
    firstTimeLogin: boolean("first_time_login").notNull().default(true),
    role: UsersRoleEnum("role").notNull().default("standard_user"),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    deletedAt: timestamp("deleted_at"),
  },
  (table) => ({
    activeIndex: index("active_index").on(table.isActive),
    boostsIndex: index("boosts_index").on(table.boosts),
  }),
);

export const UsersTableRelations = relations(UsersTable, ({ many, one }) => ({
  profile: one(ProfileTable, {
    fields: [UsersTable.id],
    references: [ProfileTable.userId],
  }),
  files: many(FilesTable),
  usersAndApplications: many(UsersAndApplicationsTable),
}));
