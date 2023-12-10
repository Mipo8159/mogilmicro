import { PostServices } from './services';
import { IPost } from './post.interface';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';
import { DomainError } from '@lib/errors';

export class PostAggregate extends PostServices implements IPost {
  @IsUUID()
  id: string = v4();

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsUUID()
  authorId: string;

  @IsBoolean()
  @Exclude()
  isPublished: boolean = false;

  @IsString()
  createdAt: string = new Date().toISOString();

  @IsString()
  updatedAt: string = new Date().toISOString();

  constructor() {
    super();
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregate();
    Object.assign(_post, post);
    _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;

    const errors = validateSync(_post);
    if (!!errors.length) {
      throw new DomainError(errors);
    }

    return _post;
  }
}
