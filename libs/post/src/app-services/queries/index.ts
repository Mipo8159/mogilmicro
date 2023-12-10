import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetPostsQueryHandler } from './get-posts/get-posts.query.handler';
import { GetPostQueryHandler } from './get-post/get-post.query.handler';

export * from './get-post/get-post.query';
export * from './get-posts/get-posts.query';

export * from './get-post/get-post.query.handler';
export * from './get-posts/get-posts.query.handler';

export const POST_QUERY_HANDLERS: Type<IQueryHandler>[] = [
  GetPostsQueryHandler,
  GetPostQueryHandler,
];
