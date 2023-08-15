import { HEALTH_CHECK, USERS_SERVICE } from "@app/common/constants";
import {
  GET_USER_BY_EMAIL,
  GET_USER_PUBLIC_CREDENTIALS,
} from "@app/common/constants/routes/users";
import { HealthCheck, PublicCredentials } from "@app/common/return_types";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";

@Injectable()
export class GatewayUsersService {
  constructor(
    @Inject(USERS_SERVICE)
    private readonly usersClient: ClientProxy,
  ) {}

  getHealthCheck() {
    return this.usersClient.send<HealthCheck, {}>(HEALTH_CHECK, {});
  }

  async getUserPublicCredentials(email: string) {
    return await firstValueFrom(
      this.usersClient.send<PublicCredentials, { email: string }>(
        GET_USER_PUBLIC_CREDENTIALS,
        { email },
      ),
    );
  }
}
