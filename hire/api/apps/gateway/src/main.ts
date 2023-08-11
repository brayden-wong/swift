import { NestFactory } from "@nestjs/core";
import { GatewayModule } from "./gateway.module";
import { ConfigService } from "@nestjs/config";
import { Logger } from "@nestjs/common";
<<<<<<< HEAD
=======
import { HttpExceptionFilter } from "@app/common/filters";
>>>>>>> api-main

async function bootstrap() {
  const logger = new Logger("Gateway Bootstrap");
  const app = await NestFactory.create(GatewayModule);
  const config = app.get<ConfigService>(ConfigService);
  const PORT = config.get<number>("PORT");

<<<<<<< HEAD
=======
  app.useGlobalFilters(new HttpExceptionFilter());

>>>>>>> api-main
  await app.listen(PORT, async () =>
    logger.log(`Gateway is listening @${await app.getUrl()}`),
  );
}
bootstrap();
