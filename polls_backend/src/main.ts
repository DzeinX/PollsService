import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    abortOnError: !!process.env.APP_ABORT_ON_ERROR,
  });
  app.enableCors();
  await app.listen(process.env.APP_PORT ?? 3000);


}
bootstrap();
