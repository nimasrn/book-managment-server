import { string } from '@hapi/joi';
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UnprocessableEntityException, UseGuards, UsePipes } from '@nestjs/common';
import { stringify } from 'querystring';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Book } from './book.entity';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create.dto';
import { UpdateBookDto } from './dto/update.dto';
import * as puppeteer from 'puppeteer';

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
      const book = await this.booksService.find(createdBook.id);
      if (res.data[`ISBN:${createBookDto.ISBN}`]) {
        const { authors, cover } = res.data[`ISBN:${createBookDto.ISBN}`];
        book.authors = authors;
        book.cover = cover;
        await this.booksService.updatebyId(book.id, book)
      }
    }, err => {
      console.log(`BooksController -> create -> err`, err);
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

  @Get('update/:id')
  async updateDetails(@Param() params): Promise<any> {
    const book = await this.booksService.find(params.id);
    this.booksService.getDetailsByISBN(book.ISBN).subscribe(async res => {
      const { authors, cover } = res.data[`ISBN:${book.ISBN}`];
      book.authors = authors;
      book.cover = cover;
      await this.booksService.updatebyId(book.id, book)
    })
    return 'update is Schedule';
  }

  @Post(':id/categories')
  async addCategory(@Param() params, @Body() body): Promise<any> {
    return await this.booksService.addCategory(params.id, body);
  }

  @Delete(':id/categories/:categoryId')
  async removeCategory(@Param() params): Promise<any> {
    return await this.booksService.removeCategoryById(params.id, params.categoryId);
  }

  @Delete(':id/categories')
  async removeCategories(@Param() params): Promise<any> {
    return await this.booksService.removeCategories(params.id);
  }

  @Get(':id')
  async getOne(@Param() params): Promise<any> {
    return await this.booksService.findwithCategoeis(params.id);
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


  @Get(':id/amazon')
  async amazon(@Param('id') id: string) {
    const book = await this.booksService.find(id);
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://www.amazon.com/s?k=${book.ISBN}&ref=nb_sb_noss`, { waitUntil: 'networkidle2' });
    await Promise.all([
      page.waitForNavigation(),
      page.click('.a-link-normal .a-text-normal'),
    ]);
    const rates = await page.$$eval('.a-icon-alt', options => options.map(option => option.textContent));
    // let details = await page.$$eval('li', options => options.map(option => option.textContent));
    // details = details.filter(element => {
    //   return element.search('ASIN') >= 0
    // })
    // let ASIN = details[0];
    // console.log(`: --------------------------`);
    // console.log(`amazon -> details`, ASIN.split(':'));
    // console.log(`: --------------------------`);
    // ASIN = ASIN.split('n');
    // await Promise.all([
    //   page.waitForNavigation(),
    //   page.click('#a-popover-trigger #a-declarative'),
    // ]);
    // const reviews = await page.$$eval('.a-size-base a-link-emphasis', options => options.map(option => option.textContent));


    await browser.close();
    return rates[0];

  }
}
