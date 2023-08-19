import { InferModel } from "drizzle-orm";
import { z } from "nestjs-zod/z";
import { ZodValidationPipe, createZodDto } from "nestjs-zod";

import { SkillsTable } from "../schemas";
import { Skills } from "../constants";

type SkillEnum = Pick<InferModel<typeof SkillsTable, "select">, "name">;
type ExtractSkillName<T> = T extends { name: infer U } ? U : never;

export type Skill = ExtractSkillName<SkillEnum>;

const skillsEnum = z.enum(Skills);

const skillsSchema = z.object({
  name: skillsEnum,
  otherName: z.string().optional(),
  userId: z.string(),
});

export class CreateSkillDto extends createZodDto(skillsSchema) {
  name: Skill;
  otherName?: string;

  constructor(name: Skill, userId: string);
  constructor(name: Skill, userId: string, otherName: string);
  constructor(name: Skill, userId: string, otherName?: string) {
    super();
    if (name === "other") {
      this.name = "other";
      this.userId = userId;
      this.otherName = otherName;
      return;
    }

    this.name = name;
    this.userId = userId;
    this.otherName = null;
  }
}

export const SkillValidationPipe = new ZodValidationPipe(skillsSchema);
export const SkillsValidationPipe = new ZodValidationPipe(
  z.object({
    skills: z.array(skillsSchema),
  }),
);
