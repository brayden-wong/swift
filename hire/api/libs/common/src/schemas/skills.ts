import { relations } from "drizzle-orm";
import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { ProfileAndSkillsTable } from "./profile.and.skills";
import { ApplicationsAndSkillsTable } from "./applications.and.skills";

import { Skills } from "../constants";

export const SkillsNameEnum = pgEnum("skills_name_enum", Skills);

export const SkillsTable = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: SkillsNameEnum("skill_name").notNull(),
  otherName: text("other_name").unique(),
});

export const SkillsRelations = relations(SkillsTable, ({ many }) => ({
  applicationsAndSkills: many(ApplicationsAndSkillsTable),
  jobPostsAndSkills: many(ApplicationsAndSkillsTable),
  profileAndSkills: many(ProfileAndSkillsTable),
}));
