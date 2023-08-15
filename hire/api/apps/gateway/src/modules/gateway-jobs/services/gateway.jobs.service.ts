import { HEALTH_CHECK, JOBS_SERVICE } from "@app/common/constants";
import { HealthCheck } from "@app/common/return_types";
import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Observable } from "rxjs";

@Injectable()
export class GatewayJobsService {
  constructor(
    @Inject(JOBS_SERVICE)
    private readonly jobsClient: ClientProxy,
  ) {}

  getHealthCheck(): Observable<HealthCheck> {
    return this.jobsClient.send<HealthCheck, {}>(HEALTH_CHECK, {});
  }
}
