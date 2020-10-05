import { Module } from '@nestjs/common';
import { BookModule } from './books/book.module';

import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BookModule,
    AuthModule,
    UsersModule
  ],
  controllers: [
    // AppController
  ],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
