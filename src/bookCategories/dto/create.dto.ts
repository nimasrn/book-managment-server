import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateBookCategoryDto {
  @IsInt()
  bookId: number;

  @IsInt()
  categoryId: number;
}