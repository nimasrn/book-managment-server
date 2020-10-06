import { IsString, IsInt, IsOptional, IsObject, IsArray } from 'class-validator';

export class UpdateCategoryDto {
  @IsInt()
  bookId: number;

  @IsInt()
  categoryId: number;
}