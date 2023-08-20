import { pgEnum, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { UsersTable } from "./users";
import { relations } from "drizzle-orm";
import { ProfileAndSkillsTable } from "./profile.and.skills";
import { JobInterests as JobInterestsArray } from "../constants";

export const JobInterests = pgEnum("job_interests", JobInterestsArray);

export const ProfileTable = pgTable("profile", {
  id: uuid("id").primaryKey().defaultRandom(),
  interestedIn: JobInterests("interested_in").notNull().array(),

  userId: uuid("user_id").references(() => UsersTable.id, {
    onDelete: "cascade",
  }),
});

export const ProfileRelations = relations(ProfileTable, ({ many, one }) => ({
  user: one(UsersTable, {
    fields: [ProfileTable.userId],
    references: [UsersTable.id],
  }),
  profileAndSkills: many(ProfileAndSkillsTable),
}));
