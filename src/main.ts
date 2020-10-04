import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cors } from 'cors';
// import morgan from 'morgan';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { logger } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.use(helmet());
  app.enableCors();
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
