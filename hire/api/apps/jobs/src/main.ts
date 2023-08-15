import { NestFactory } from "@nestjs/core";
import { JobsModule } from "./jobs.module";
import { TcpClientOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Jobs Bootstrap");
  const app = await NestFactory.createMicroservice<TcpClientOptions>(
    JobsModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
      },
    },
  );

  logger.log(
    `Jobs Microservice is listening on ${process.env.HOST}@${process.env.PORT}`,
  );
  await app.listen();
}
bootstrap();
