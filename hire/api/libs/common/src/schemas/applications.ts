import { relations } from "drizzle-orm";
import { pgTable, uuid } from "drizzle-orm/pg-core";
import { JobPostsTable } from "./job.posts";
import { ApplicationsAndSkillsTable } from "./applications.and.skills";
import { UsersTable } from "./users";
import { FilesTable } from "./files";
import { ApplicationsAndFilesTable } from "./applications.and.files";

export const ApplicationsTable = pgTable("applications", {
  id: uuid("id").notNull().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => UsersTable.id),
  jobPostId: uuid("job_post_id")
    .notNull()
    .references(() => JobPostsTable.id),
});

export const ApplicationsRelations = relations(
  ApplicationsTable,
  ({ many, one }) => ({
    jobPost: one(JobPostsTable, {
      fields: [ApplicationsTable.jobPostId],
      references: [JobPostsTable.id],
    }),
    applicationsAndFiles: many(ApplicationsAndFilesTable),
    skills: many(ApplicationsAndSkillsTable),
  }),
);
