import { pgTable, primaryKey, timestamp, uuid } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { relations, sql } from "drizzle-orm";
import { ApplicationsTable } from "./applications";

export const UsersAndApplicationsTable = pgTable(
  "users_and_applications",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id),
    applicationId: uuid("application_id")
      .notNull()
      .references(() => UsersTable.id),
    appliedAt: timestamp("applied_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    primaryKey: primaryKey(table.userId, table.applicationId),
  }),
);

export const UsersAndApplicationsRelations = relations(
  UsersAndApplicationsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [UsersAndApplicationsTable.userId],
      references: [UsersTable.id],
    }),
    application: one(ApplicationsTable, {
      fields: [UsersAndApplicationsTable.applicationId],
      references: [ApplicationsTable.id],
    }),
  }),
);
