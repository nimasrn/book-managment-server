import { Module } from '@nestjs/common';
import { BookModule } from './books/book.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
import { CategoryModule } from './categories/category.module';
import { BookCategoryModule } from './bookCategories/bookCategory.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BookModule,
    AuthModule,
    UsersModule,
    CategoryModule,
    BookCategoryModule
  ],
  controllers: [
    // AppController
  ],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
