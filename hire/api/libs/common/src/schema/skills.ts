import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { UsersAndSkillsTable } from "./profile.and.skills";
import { ApplicationsAndSkillsTable } from "./applications.and.skills";

export const SkillsTable = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  skillName: text("skill_name").notNull().unique(),
});

export const SkillsRelations = relations(SkillsTable, ({ many }) => ({
  applicationsAndSkills: many(ApplicationsAndSkillsTable),
  jobPostsAndSkills: many(ApplicationsAndSkillsTable),
  usersAndSkills: many(UsersAndSkillsTable),
}));
