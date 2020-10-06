import { BookCategory } from 'src/bookCategories/bookCategory.entity';
import { Category } from 'src/categories/category.entity';
import { Column, Entity, IsNull, ManyToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["ISBN"])

export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  ISBN: string;

  @Column({ type: "json", nullable: true })
  authors: any;

  @Column({ type: "json", nullable: true })
  // eslint-disable-next-line @typescript-eslint/ban-types
  cover: string;

  @ManyToMany(type => Category, BookCategory => BookCategory)
  categories: Category[];

}
