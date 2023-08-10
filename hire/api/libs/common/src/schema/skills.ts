import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";
import { UsersAndSkillsTable } from "./users.and.skills";

export const SkillsTable = pgTable("skills", {
  id: uuid("id").primaryKey().defaultRandom(),
  skillName: text("skill_name").notNull().unique(),
});

export const SkillsRelations = relations(SkillsTable, ({ many }) => ({
  usersAndSkills: many(UsersAndSkillsTable),
}));
