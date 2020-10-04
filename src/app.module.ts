import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { BookModule } from './books/book.module';

import { BooksController } from './books/books.controller';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [BookModule, AuthModule],
})
export class AppModule { }
