import { GET_USER_BY_ID, USERS_SERVICE } from "@app/common/constants";
import { CreateSkillDto } from "@app/common/dto";
import { Database, InjectDrizzle } from "@app/common/modules";
import { AddSkill, GetUserById } from "@app/common/return_types";
import {
  ProfileAndSkillsRelations,
  ProfileAndSkillsTable,
  SkillsTable,
} from "@app/common/schemas";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { like } from "drizzle-orm";
import { firstValueFrom, map } from "rxjs";

@Injectable()
export class SkillsService {
  constructor(
    @Inject(USERS_SERVICE) private readonly usersClient: ClientProxy,
    @InjectDrizzle() private readonly db: Database,
  ) {}

  async addSkills(createSkillDto: CreateSkillDto): Promise<AddSkill>;
  async addSkills(
    createSkillDto: Array<CreateSkillDto>,
  ): Promise<AddSkill[] | []>;
  async addSkills(
    createSkillDto: CreateSkillDto | Array<CreateSkillDto>,
  ): Promise<AddSkill | Array<CreateSkillDto>> {
    if (Array.isArray(createSkillDto)) {
      const profileId = await this.getProfileId(createSkillDto[0].userId);

      if (profileId === null) return;

      const skills: Array<AddSkill> = [];

      for (const skill of createSkillDto) {
        const result = await this.addSkill(skill, profileId);
        if (result !== null) skills.push(result);
      }

      return skills;
    }

    const profileId = await this.getProfileId(createSkillDto.userId);

    if (profileId === null) return null;

    return await this.addSkill(createSkillDto, profileId);
  }

  private async addSkill(
    createSkillDto: CreateSkillDto,
    profileId: string,
  ): Promise<AddSkill> {
    if (createSkillDto.otherName !== null) {
      const results = await this.db.query.SkillsTable.findMany({
        where: (SkillsTable, { and, eq }) =>
          and(
            eq(SkillsTable.name, "Other"),
            like(SkillsTable.otherName, `%${createSkillDto.otherName}%`),
          ),
      });

      if (results.length > 0) {
        for (const result of results) {
          if (result.otherName === createSkillDto.otherName) {
            await this.linkSkillToUser(result.id, profileId);
            return {
              id: result.id,
              name: result.name,
              otherName: result.otherName,
            };
          }
        }
      }

      const [skill] = await this.db
        .insert(SkillsTable)
        .values(createSkillDto)
        .returning();

      await this.linkSkillToUser(skill.id, profileId);

      return skill;
    }

    const [skill] = await this.db
      .insert(SkillsTable)
      .values(createSkillDto)
      .returning();

    await this.linkSkillToUser(skill.id, profileId);

    return skill;
  }

  private async linkSkillToUser(
    skillId: string,
    profileId: string,
  ): Promise<void> {
    await this.db
      .insert(ProfileAndSkillsTable)
      .values({
        profileId,
        skillId,
      })
      .returning();
  }

  private async getProfileId(userId: string) {
    const user = await firstValueFrom(
      this.usersClient.send<GetUserById, { id: string }>(GET_USER_BY_ID, {
        id: userId,
      }),
    );

    if (!user) return null;

    return user.profile.id;
  }
}
