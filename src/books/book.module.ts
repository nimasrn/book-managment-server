import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), HttpModule],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService]
})
export class BookModule { }
