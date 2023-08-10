import { relations, sql } from "drizzle-orm";
import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { UsersAndApplicationsTable } from "./users.and.applications";
import { CompaniesTable } from "./company";

export const JobPrefixEnum = pgEnum("job_prefix", [
  "jr",
  "sr",
  "lead",
  "manager",
  "staff",
  "intern",
  "contractor",
  "other",
  "--",
]);

// rename ApplicationsTable to JobPostTable
export const ApplicationsTable = pgTable(
  "applications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    jobTitle: text("job_title").notNull(),
    jobPrefix: JobPrefixEnum("job_prefix").notNull(),
    otherPrefix: text("other_title"),
    description: text("description").notNull(),

    salary: text("salary").array(),
    companyId: uuid("company_id")
      .notNull()
      .references(() => CompaniesTable.id),
    createdAt: timestamp("created_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: timestamp("updated_at")
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    archivedAt: timestamp("archived_at"),
  },
  (table) => ({
    jobTitleIndex: index("job_title_index").on(
      table.jobPrefix,
      table.otherPrefix,
    ),
  }),
);

export const ApplicationsRelations = relations(
  ApplicationsTable,
  ({ many, one }) => ({
    company: one(CompaniesTable, {
      fields: [ApplicationsTable.companyId],
      references: [CompaniesTable.id],
    }),

    usersAndApplications: many(UsersAndApplicationsTable),
  }),
);
