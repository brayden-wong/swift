import { Controller, Get } from "@nestjs/common";
import { JobsService } from "../services/jobs.service";
import { MessagePattern } from "@nestjs/microservices";
import { HEALTH_CHECK } from "@app/common/constants";
import { HealthCheck } from "@app/common/return_types";

@Controller()
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @MessagePattern(HEALTH_CHECK)
  getHealthCheck(): HealthCheck {
    return {
      name: "Jobs Microservice",
      status: "ok",
    };
  }
}
