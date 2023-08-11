import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { SkillsTable } from "./skills";
import { relations } from "drizzle-orm";
import { ProfileTable } from "./profile";

export const ProfileAndSkillsTable = pgTable(
  "users_and_skills",
  {
    profileId: uuid("profile_id")
      .notNull()
      .references(() => ProfileTable.id),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => SkillsTable.id),
  },
  (table) => ({
    primaryKey: primaryKey(table.profileId, table.skillId),
  }),
);

export const ProfileAndSkillsRelations = relations(
  ProfileAndSkillsTable,
  ({ one }) => ({
    profile: one(ProfileTable, {
      fields: [ProfileAndSkillsTable.profileId],
      references: [ProfileTable.id],
    }),
    skill: one(SkillsTable, {
      fields: [ProfileAndSkillsTable.skillId],
      references: [SkillsTable.id],
    }),
  }),
);
