import { IsString, IsInt, IsOptional, IsObject, IsArray } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;
}