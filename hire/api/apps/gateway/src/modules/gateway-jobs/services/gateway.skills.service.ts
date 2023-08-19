import { ADD_SKILL, SKILLS_SERVICE } from "@app/common/constants";
import { CreateSkillDto } from "@app/common/dto";
import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { map } from "rxjs";

@Injectable()
export class GatewaySkillsService {
  constructor(
    @Inject(SKILLS_SERVICE)
    private readonly skillsProxy: ClientProxy,
  ) {}

  addSkills(createSkillDto: CreateSkillDto | Array<CreateSkillDto>) {
    return this.skillsProxy
      .send<any, CreateSkillDto | Array<CreateSkillDto>>(
        ADD_SKILL,
        createSkillDto,
      )
      .pipe(
        map((skill) => {
          if (skill === null) throw new NotFoundException("User not found");

          return skill;
        }),
      );
  }
}
