import { HEALTH_CHECK, JOBS_CONTROLLER } from "@app/common/constants";
import { Controller, Get } from "@nestjs/common";
import { GatewayJobsService } from "../services";
import { Public } from "@app/common/decorators";
import { Observable } from "rxjs";
import { HealthCheck } from "@app/common/return_types";

@Controller(JOBS_CONTROLLER)
export class GatewayJobsController {
  constructor(private readonly jobsService: GatewayJobsService) {}

  @Public()
  @Get(HEALTH_CHECK)
  getHealthCheck(): Observable<HealthCheck> {
    return this.jobsService.getHealthCheck();
  }
}
