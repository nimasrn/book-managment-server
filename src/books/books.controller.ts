import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, UsePipes } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/dto';
import { Book } from './interfaces/book.interface';
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }
}
