import { HttpService, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
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

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
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