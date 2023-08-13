import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
import { HttpExceptionFilter } from "@app/common/filters";

async function bootstrap() {
  const logger = new Logger("Gateway Bootstrap");
  const app = await NestFactory.create(GatewayModule);
  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get<number>("PORT");

  app.useGlobalFilters(new HttpExceptionFilter());
  app.enableCors();

  await app.listen(PORT, async () =>
    logger.log(`Gateway is listening @${await app.getUrl()}`),
  );
}
bootstrap();
