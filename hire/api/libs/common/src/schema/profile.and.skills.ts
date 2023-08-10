import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { SkillsTable } from "./skills";
import { relations } from "drizzle-orm";

export const ProfileAndSkillsTable = pgTable(
  "users_and_skills",
  {
    profileId: uuid("profile_id")
      .notNull()
      .references(() => UsersTable.id),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => SkillsTable.id),
  },
  (table) => ({
    primaryKey: primaryKey(table.profileId, table.skillId),
  }),
);

export const UsersAndSkillsRelations = relations(
  ProfileAndSkillsTable,
  ({ one }) => ({
    profile: one(UsersTable, {
      fields: [ProfileAndSkillsTable.profileId],
      references: [UsersTable.id],
    }),
    skill: one(SkillsTable, {
      fields: [ProfileAndSkillsTable.skillId],
      references: [SkillsTable.id],
    }),
  }),
);
