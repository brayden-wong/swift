import { pgTable, uuid } from "drizzle-orm/pg-core";
import { JobPostsTable } from "./job.posts";
import { SkillsTable } from "./skills";
import { relations } from "drizzle-orm";

export const JobPostsAndSkillsTable = pgTable("job_posts_and_skills", {
  jobPostId: uuid("job_post_id")
    .notNull()
    .references(() => JobPostsTable.id),
  skillId: uuid("skill_id")
    .notNull()
    .references(() => SkillsTable.id),
});

export const JobPostAndSkilsRelations = relations(
  JobPostsAndSkillsTable,
  ({ one }) => ({
    jobPost: one(JobPostsTable, {
      fields: [JobPostsAndSkillsTable.jobPostId],
      references: [JobPostsTable.id],
    }),
    skill: one(SkillsTable, {
      fields: [JobPostsAndSkillsTable.skillId],
      references: [SkillsTable.id],
    }),
  }),
);
