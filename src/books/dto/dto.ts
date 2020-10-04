import { IsString, IsInt } from 'class-validator';

export class CreateBookDto {
  @IsString()
  name: string;
  @IsInt()
  ISBN: string;
}