import { HEALTH_CHECK } from "@app/common/constants";
import { Public } from "@app/common/decorators";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class GatewayController {
  @Public()
  @Get(HEALTH_CHECK)
  getHealthCheck() {
    return {
      name: "API Gateway",
      status: "ok",
    };
  }
}
