import { Column, Entity, IsNull, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(["name"])

export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
