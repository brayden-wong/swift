import { SKILLS_SERVICE } from "@app/common/constants";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class GatewaySkillsService {
  constructor(
    @Inject(SKILLS_SERVICE)
    private readonly skillsProxy: ClientProxy,
  ) {}
}
