import { InferModel } from "drizzle-orm";
import { SkillsTable } from "../schemas";
import { z } from "nestjs-zod/z";
import { ZodValidationPipe, createZodDto } from "nestjs-zod";
import { Skills } from "../constants";

type SkillEnum = Pick<InferModel<typeof SkillsTable, "select">, "skillName">;
type ExtractSkillName<T> = T extends { skillName: infer U } ? U : never;

export type Skill = ExtractSkillName<SkillEnum>;

const skillsEnum = z.enum(Skills);

const skillsSchema = z.object({
  skillName: skillsEnum,
  otherName: z.string().optional(),
});

export class CreateSkillDto extends createZodDto(skillsSchema) {
  skillName: Skill;
  otherName?: string;

  constructor(skillName: Skill);
  constructor(skillName: Skill, otherName: string);
  constructor(skillName: Skill, otherName?: string) {
    super();
    if (skillName === "other") {
      this.skillName = "other";
      this.otherName = otherName;
      return;
    }

    this.skillName = skillName;
  }
}

export const SkillsValidationPipe = new ZodValidationPipe(skillsSchema);
