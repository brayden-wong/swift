import {
  ADD_SKILL,
  ADD_SKILLS,
  SKILLS_CONTROLLER,
} from "@app/common/constants";
import {
  Body,
  Controller,
  HttpException,
  Post,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { GatewaySkillsService } from "../services";
import {
  AccessTokenDto,
  CreateSkillDto,
  SkillValidationPipe,
  SkillsValidationPipe,
  User,
} from "@app/common/dto";
import { CurrentToken, Public } from "@app/common/decorators";
import { Skills } from "@app/common/constants";
import { AtGuard } from "@app/common/guards";

@Controller(SKILLS_CONTROLLER)
export class GatewaySkillsController {
  constructor(private readonly skillsService: GatewaySkillsService) {}

  @Public()
  @Post(ADD_SKILL)
  addSkill(
    @Body() createSkillDto: CreateSkillDto,
    @CurrentToken() token: AccessTokenDto,
  ) {
    const { name, ...restOfData } = createSkillDto;

    if (restOfData.otherName !== undefined) {
      const { otherName } = restOfData;

      return this.skillsService.addSkills(new CreateSkillDto(name, otherName));
    }

    return this.skillsService.addSkills(new CreateSkillDto(name, token.sub));
  }

  @Post(ADD_SKILLS)
  addSkills(
    @Body("skills") createSkillDto: Array<CreateSkillDto>,
    @CurrentToken() token: AccessTokenDto,
  ) {
    const arrayOfSkills: Array<CreateSkillDto> = [];
    for (const skill of createSkillDto) {
      if (skill.otherName !== undefined) {
        const { otherName } = skill;

        arrayOfSkills.push(
          new CreateSkillDto(skill.name, token.sub, otherName),
        );
        continue;
      }

      arrayOfSkills.push(new CreateSkillDto(skill.name, token.sub));
    }

    return this.skillsService.addSkills(arrayOfSkills);
  }
}
