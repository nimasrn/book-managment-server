import { IsString, IsInt, IsOptional, IsArray } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  ISBN: string;

  @IsArray()
  categories: Array<any>;
}