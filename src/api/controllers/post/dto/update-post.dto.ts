import { PartialType } from '@nestjs/mapped-types';
import { ICreatePostDto } from './create-post.dto';
import { IsUUID } from 'class-validator';

export class IUpdatePostDto extends PartialType(ICreatePostDto) {
  @IsUUID()
  authorId: string;
}
