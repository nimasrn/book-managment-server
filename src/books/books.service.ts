import { bool } from '@hapi/joi';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNotEmpty } from 'class-validator';
import { Observable } from 'rxjs';
import { Like, Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create.dto';
import { UpdateBookDto } from './dto/update.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    private httpService: HttpService
  ) { }
  create({ title, ISBN, categories }): Promise<Book> {
    const book = new Book();
    book.title = title;
    book.ISBN = ISBN;
    book.categories = categories;
    return this.bookRepository.save(book);
  }

  find(id): Promise<Book> {
    return this.bookRepository.findOne({ id });
  }

  findwithCategoeis(id): Promise<Book> {
    return this.bookRepository.findOne({ id }, { relations: ["categories"] });
  }

  findOneByISBN(ISBN): Promise<Book> {
    return this.bookRepository.findOne({ ISBN: ISBN });
  }

  async findAll({ page }): Promise<any> {
    const take = 10
    const skip = page * 10;

    const [data, total] = await this.bookRepository.findAndCount(
      {
        take,
        skip,
        relations: ["categories"]
      }
    );
    return {
      data,
      count: total
    }
  }
  async findAllWithOutPagination(): Promise<any> {
    return await this.bookRepository.find();
  }

  async findAllWithSearch({ page, title = null }): Promise<any> {
    const take = 10
    const skip = page * 10;

    const [data, total] = await this.bookRepository.findAndCount(
      {
        where: { title: Like('%' + title + '%') },
        take,
        skip,
        relations: ["categories"]
      }
    );
    return {
      data,
      count: total
    }
  }

  getDetailsByISBN(ISBN: string): Observable<any> {
    return this.httpService.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${ISBN}&jscmd=data&format=json`);
  }

  // getAuthor(authorUrl: string): Observable<any> {
  //   return this.httpService.get(`https://openlibrary.org/${authorUrl}.json`);
  // }

  updatebyId(id: number, book: UpdateBookDto): Promise<any> {
    return this.bookRepository.update({ id: id }, book);
  }

  async addCategory(id: number, category): Promise<any> {
    return await this.bookRepository.createQueryBuilder().relation(Book, 'categories').of(id).add(category);
  }

  async removeCategoryById(id: number, categoryId): Promise<any> {
    return await this.bookRepository.createQueryBuilder().relation(Book, 'categories').of(id).remove([categoryId]);
  }

  async removeCategories(id: number): Promise<any> {
    const book = this.findwithCategoeis(id);
    return await this.bookRepository.createQueryBuilder().relation(Book, 'categories').of(id).remove((await book).categories);
  }

  delete(id: number): Promise<any> {
    return this.bookRepository.delete(id);
  }


}