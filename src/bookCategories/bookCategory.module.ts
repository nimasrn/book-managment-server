import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookCategoriesController } from './bookCategories.controller';
import { BookCategoriesService } from './bookCategories.service';
import { BookCategory } from './bookCategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookCategory]), HttpModule],
  controllers: [BookCategoriesController],
  providers: [BookCategoriesService],
  exports: [BookCategoriesService]
})
export class BookCategoryModule { }
