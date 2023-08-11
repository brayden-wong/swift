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

  console.log(process.env.PORT);
  console.log(process.env.HOST);

  logger.log(`Users listening internally @PORT:${process.env.PORT || 8082}`);
  await app.listen();
}
bootstrap();
