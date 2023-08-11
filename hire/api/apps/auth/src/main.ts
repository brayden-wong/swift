import { NestFactory } from "@nestjs/core";
import { AuthModule } from "./auth.module";
import { TcpClientOptions, Transport } from "@nestjs/microservices";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Auth Bootstrap");
  const app = await NestFactory.createMicroservice<TcpClientOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT) || 8081,
      },
    },
  );

  logger.log(`Auth listening internally @PORT:${process.env.PORT || 8081}`);
  await app.listen();
}
bootstrap();
