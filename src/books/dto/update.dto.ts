import { IsString, IsInt, IsOptional, IsObject, IsArray } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  title: string;

  @IsString()
  ISBN: string;

  @IsArray()
  authors: string[];

  @IsObject()
  // eslint-disable-next-line @typescript-eslint/ban-types
  cover: string;

}