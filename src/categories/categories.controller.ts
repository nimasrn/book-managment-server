import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Req, UnprocessableEntityException, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create.dto';
import { UpdateCategoryDto } from './dto/update.dto';
@Controller('categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryService.findByName(createCategoryDto.name);
    if (category) {
      throw new HttpException('The category already exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return await this.categoryService.create(createCategoryDto);
  }

  @Get('')
  async findAll(): Promise<Category[]> {
    return await this.categoryService.findAll();
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async edit(@Param() params, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category[]> {
    const book = await this.categoryService.updatebyId(params.id, updateCategoryDto);
    return book;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param() params): Promise<Category> {
    return this.categoryService.delete(params.id);
  }
}
