import { NestFactory } from "@nestjs/core";
import { UsersModule } from "./users.module";
import { TcpClientOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Users Bootstrap");
  const app = await NestFactory.createMicroservice<TcpClientOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT) || 8082,
      },
    },
  );

  logger.log(
    `Users Microservice is listening on ${process.env.HOST}@${process.env.PORT}`,
  );
  await app.listen();
}
bootstrap();
