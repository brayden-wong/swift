import { ADD_SKILL } from "@app/common/constants";
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { SkillsService } from "../services";
import { CreateSkillDto } from "@app/common/dto";

@Controller()
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @MessagePattern(ADD_SKILL)
  async addSkill(
    @Payload() createSkillDto: CreateSkillDto | Array<CreateSkillDto>,
  ) {
    return await this.skillsService.addSkills(
      Array.isArray(createSkillDto) ? createSkillDto : Array.of(createSkillDto),
    );
  }
}
