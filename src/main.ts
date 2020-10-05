import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { cors } from 'cors';
// import morgan from 'morgan';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import { logger } from './middleware/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(logger);
  app.use(helmet());
  app.enableCors();
  app.use(morgan('dev'));
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message:
      "Too many requests from this IP, please try again later"
  }));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
