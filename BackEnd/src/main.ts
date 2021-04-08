import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as mongoose from 'mongoose';

mongoose.set('useFindAndModify', false);

const port = 3000 || process.env.PORT;

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors();

  await app.listen(port);

  logger.verbose(`Server listening at port ${port}`);
}

bootstrap();
