import { ADD_SKILL, SKILLS_CONTROLLER } from "@app/common/constants";
import {
  Body,
  Controller,
  HttpException,
  Post,
  UsePipes,
} from "@nestjs/common";
import { GatewaySkillsService } from "../services";
import { CreateSkillDto, SkillsValidationPipe } from "@app/common/dto";
import { Public } from "@app/common/decorators";

import { Skills } from "@app/common/constants";

@Controller(SKILLS_CONTROLLER)
export class GatewaySkillsController {
  constructor(private readonly skillsService: GatewaySkillsService) {}

  @Public()
  @UsePipes(SkillsValidationPipe)
  @Post(ADD_SKILL)
  addSkill(@Body() createSkillDto: CreateSkillDto) {
    const { skillName, otherName } = createSkillDto;
    if (
      otherName &&
      Skills.find((skill) => skill.toLowerCase() === otherName.toLowerCase())
    ) {
      throw new HttpException("Skill already exists", 400);
    }

    return {
      name: skillName,
    };
  }
}
