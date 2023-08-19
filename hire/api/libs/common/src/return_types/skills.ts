import { Skill } from "../dto/skill.dto";

export type AddSkill = {
  id: string;
  name: Skill;
  otherName?: string;
};
