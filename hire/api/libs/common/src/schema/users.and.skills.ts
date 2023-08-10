import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { SkillsTable } from "./skills";
import { relations } from "drizzle-orm";

export const UsersAndSkillsTable = pgTable(
  "users_and_skills",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => UsersTable.id),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => SkillsTable.id),
  },
  (table) => ({
    primaryKey: primaryKey(table.userId, table.skillId),
  }),
);

export const UsersAndSkillsRelations = relations(
  UsersAndSkillsTable,
  ({ one }) => ({
    user: one(UsersTable, {
      fields: [UsersAndSkillsTable.userId],
      references: [UsersTable.id],
    }),
    skill: one(SkillsTable, {
      fields: [UsersAndSkillsTable.skillId],
      references: [SkillsTable.id],
    }),
  }),
);
