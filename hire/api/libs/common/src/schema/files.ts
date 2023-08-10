import { relations, sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";
import { UsersTable } from "./users";

export const FilesTable = pgTable(
  "files",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    fileName: text("file_name").notNull(),
    fileUrl: text("file_url").notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id),

    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    unique: uniqueIndex("file_name_on_user_id").on(
      table.fileName,
      table.userId,
    ),
  }),
);

export const FilesRelations = relations(FilesTable, ({ one }) => ({
  user: one(UsersTable, {
    fields: [FilesTable.userId],
    references: [UsersTable.id],
  }),
}));
