import { array } from '@hapi/joi';
import { Category } from 'src/categories/category.entity';
import { Column, Entity, IsNull, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

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
  cover: string;

  @Column({ nullable: true })
  amazonRating: string;

  @ManyToMany(type => Category, { cascade: true })
  @JoinTable()
  categories: Category[];

}
