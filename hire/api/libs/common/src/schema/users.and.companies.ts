import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { CompaniesTable } from "./companies";
import { relations } from "drizzle-orm";

export const UsersAndCompaniesTable = pgTable(
  "users_and_companies",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id),
    companyId: uuid("company_id")
      .notNull()
      .references(() => CompaniesTable.id),
  },
  (table) => ({
    primaryKey: primaryKey(table.userId, table.companyId),
  }),
);

export const UsersAndCompaniesRelations = relations(
  UsersAndCompaniesTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [UsersAndCompaniesTable.userId],
      references: [UsersTable.id],
    }),
    company: one(CompaniesTable, {
      fields: [UsersAndCompaniesTable.companyId],
      references: [CompaniesTable.id],
    }),
  }),
);
