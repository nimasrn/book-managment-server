import { string } from '@hapi/joi';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UnprocessableEntityException, UseGuards, UsePipes } from '@nestjs/common';
import { stringify } from 'querystring';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create.dto';
import { UpdateBookDto } from './dto/update.dto';
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBookDto: CreateBookDto) {
    const book = await this.booksService.findOneByISBN(createBookDto.ISBN);
    if (book) {
      throw new HttpException('The book with ISBN already exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    const createdBook = await this.booksService.create(createBookDto);

    this.booksService.getDetailsByISBN(createBookDto.ISBN).subscribe(async res => {
      const { authors, cover } = res.data[`ISBN:${createBookDto.ISBN}`];
      createdBook.authors = authors;
      createdBook.cover = cover;
      await this.booksService.updatebyId(createdBook.id, createdBook)
    })

    return createdBook;
  }

  @Get('')
  async findAll(@Query() params): Promise<Book[]> {
    if (params.title) {
      return await this.booksService.findAllWithSearch(params);
    } else {
      return await this.booksService.findAll(params);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async edit(@Param() params, @Body() updateBookDto: UpdateBookDto): Promise<Book[]> {
    const book = await this.booksService.updatebyId(params.id, updateBookDto);
    return book;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param() params): Promise<Book> {
    return this.booksService.delete(params.id);
  }
}
