import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Like, Repository } from 'typeorm';
import { BookCategory } from './bookCategory.entity';
import { UpdateCategoryDto } from './dto/update.dto';

@Injectable()
export class BookCategoriesService {
  constructor(
    @InjectRepository(BookCategory)
    private readonly categoryRepository: Repository<BookCategory>,
    private httpService: HttpService
  ) { }
  create({ bookId, categoryId }): Promise<BookCategory> {
    const bookCategory = new BookCategory();
    bookCategory.bookId = bookId;
    bookCategory.categoryId = categoryId;
    return this.categoryRepository.save(bookCategory);
  }

  find({ bookId, categoryId }): Promise<BookCategory> {
    return this.categoryRepository.findOne({ bookId: bookId, categoryId: categoryId });
  }

  async findAll(): Promise<any> {
    return await this.categoryRepository.find();
  }

  updatebyId(id: any, category: UpdateCategoryDto): Promise<any> {
    return this.categoryRepository.update(id, category);
  }

  delete(id: number): Promise<any> {
    return this.categoryRepository.delete(id);
  }
}