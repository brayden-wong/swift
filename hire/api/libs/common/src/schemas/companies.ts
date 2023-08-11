import { relations } from "drizzle-orm";
import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { UsersAndCompaniesTable } from "./users.and.companies";
import { CompaniesAndJobsTable } from "./companies.and.jobs";

export const CompaniesTable = pgTable(
  "companies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull().unique(),
  },
  (table) => ({
    nameIndex: index("name_index").on(table.name),
  }),
);

export const CompaniesRelations = relations(CompaniesTable, ({ many }) => ({
  companiesAndJobs: many(CompaniesAndJobsTable),
  users: many(UsersAndCompaniesTable),
}));
