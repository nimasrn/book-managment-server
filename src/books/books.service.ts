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
  create({ title, ISBN }): Promise<Book> {
    const book = new Book();
    book.title = title;
    book.ISBN = ISBN;
    return this.bookRepository.save(book);
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
        skip
      }
    );
    return {
      data,
      count: total
    }
  }

  async findAllWithSearch({ page, title = null }): Promise<any> {
    const take = 10
    const skip = page * 10;

    const [data, total] = await this.bookRepository.findAndCount(
      {
        where: { title: Like('%' + title + '%') },
        take,
        skip
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

  updatebyId(id: any, book: UpdateBookDto): Promise<any> {
    return this.bookRepository.update(id, book);
  }

  delete(id: number): Promise<any> {
    return this.bookRepository.delete(id);
  }
}