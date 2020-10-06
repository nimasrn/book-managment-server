import { Book } from 'src/books/book.entity';
import { Category } from 'src/categories/category.entity';
import { Column, Entity, IsNull, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()

export class BookCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(type => Book)
  @JoinColumn()
  bookId: number;

  @OneToOne(type => Category)
  @JoinColumn()
  categoryId: number;
}
