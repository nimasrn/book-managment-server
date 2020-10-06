import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UnprocessableEntityException, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { BookCategoriesService } from './bookCategories.service';
import { BookCategory } from './bookCategory.entity';
import { CreateBookCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';
@Controller('bookCategories')
export class BookCategoriesController {
  constructor(private bookCategoriesService: BookCategoriesService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createBookCategoryDto: CreateBookCategoryDto) {
    const category = await this.bookCategoriesService.find(createBookCategoryDto);
    if (category) {
      throw new HttpException('The category already exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return await this.bookCategoriesService.create(createBookCategoryDto);
  }

  @Get('')
  async findAll(): Promise<BookCategory[]> {
    return await this.bookCategoriesService.findAll();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async edit(@Param() params, @Body() updateCategoryDto: UpdateCategoryDto): Promise<BookCategory[]> {
    const book = await this.bookCategoriesService.updatebyId(params.id, updateCategoryDto);
    return book;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param() params): Promise<BookCategory> {
    return this.bookCategoriesService.delete(params.id);
  }
}
