import { NestFactory } from '@nestjs/core';
import { AuthAppModule } from './auth.app.module';
import { TcpClientOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Auth App Bootstrap');
  const app = await NestFactory.createMicroservice<TcpClientOptions>(
    AuthAppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT) || 8081,
      },
    },
  );

  logger.log(`Auth listening internally @${process.env.PORT || 8081}`);
  await app.listen();
}
bootstrap();
