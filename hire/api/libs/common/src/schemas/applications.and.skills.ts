import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { ApplicationsTable } from "./applications";
import { SkillsTable } from "./skills";
import { relations } from "drizzle-orm";

export const ApplicationsAndSkillsTable = pgTable(
  "applications_and_skills",
  {
    applicationId: uuid("application_id")
      .notNull()
      .references(() => ApplicationsTable.id),
    skillId: uuid("skill_id")
      .notNull()
      .references(() => SkillsTable.id),
  },
  (table) => ({
    primaryKey: primaryKey(table.applicationId, table.skillId),
  }),
);

export const ApplicationsAndSkillsRelations = relations(
  ApplicationsAndSkillsTable,
  ({ one }) => ({
    application: one(ApplicationsTable, {
      fields: [ApplicationsAndSkillsTable.applicationId],
      references: [ApplicationsTable.id],
    }),
    skill: one(SkillsTable, {
      fields: [ApplicationsAndSkillsTable.skillId],
      references: [SkillsTable.id],
    }),
  }),
);
