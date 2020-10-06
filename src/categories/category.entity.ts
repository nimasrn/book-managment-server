import { Book } from 'src/books/book.entity';
import { Column, Entity, IsNull, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["name"])

export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

}
