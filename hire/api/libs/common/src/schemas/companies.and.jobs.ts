import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { CompaniesTable } from "./companies";
import { JobPostsTable } from "./job.posts";
import { relations } from "drizzle-orm";

export const CompaniesAndJobsTable = pgTable(
  "companies_and_jobs",
  {
    companyId: uuid("company_id")
      .notNull()
      .references(() => CompaniesTable.id),
    jobPostId: uuid("job_post_id")
      .notNull()
      .references(() => JobPostsTable.id),
  },
  (table) => ({
    primaryKey: primaryKey(table.companyId, table.jobPostId),
  }),
);

export const CompaniesAndJobsRelations = relations(
  CompaniesAndJobsTable,
  ({ one }) => ({
    company: one(CompaniesTable, {
      fields: [CompaniesAndJobsTable.companyId],
      references: [CompaniesTable.id],
    }),
    jobPost: one(JobPostsTable, {
      fields: [CompaniesAndJobsTable.jobPostId],
      references: [JobPostsTable.id],
    }),
  }),
);
