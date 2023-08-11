import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { FilesTable } from "./files";
import { ApplicationsTable } from "./applications";
import { relations } from "drizzle-orm";

export const ApplicationsAndFilesTable = pgTable(
  "applications_and_files",
  {
    ApplicationId: uuid("application_id")
      .notNull()
      .references(() => ApplicationsTable.id, { onDelete: "cascade" }),
    fileId: uuid("file_id")
      .notNull()
      .references(() => FilesTable.id),
  },
  (table) => ({
    primaryKey: primaryKey(table.fileId, table.ApplicationId),
  }),
);

export const ApplicationsAndFilesRelations = relations(
  ApplicationsAndFilesTable,
  ({ one }) => ({
    application: one(ApplicationsTable, {
      fields: [ApplicationsAndFilesTable.ApplicationId],
      references: [ApplicationsTable.id],
    }),
    file: one(FilesTable, {
      fields: [ApplicationsAndFilesTable.fileId],
      references: [FilesTable.id],
    }),
  }),
);
