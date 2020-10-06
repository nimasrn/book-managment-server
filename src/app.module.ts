import { HttpModule, Module } from '@nestjs/common';
import { BookModule } from './books/book.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
import { CategoryModule } from './categories/category.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BooksService } from './books/books.service';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": process.env.DATABASE_HOST,
      "port": Number(process.env.DATABASE_PORT),
      "username": process.env.DATABASE_USER,
      "password": process.env.DATABASE_PASSWORD,
      "database": process.env.DATABASE_NAME,
      "entities": ["dist/**/*.entity{.ts,.js}"],
      "synchronize": true
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
    BookModule,
    AuthModule,
    UsersModule,
    CategoryModule,
  ],
  controllers: [
    // AppController
  ],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
