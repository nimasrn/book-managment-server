import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Like, Repository } from 'typeorm';
import { Category } from './category.entity';
import { UpdateCategoryDto } from './dto/update.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private httpService: HttpService
  ) { }
  create({ name }): Promise<Category> {
    const category = new Category();
    category.name = name;
    return this.categoryRepository.save(category);
  }

  findByName(name: string): Promise<Category> {
    return this.categoryRepository.findOne({ name });
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