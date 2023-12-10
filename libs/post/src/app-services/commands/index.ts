import { Type } from '@nestjs/common';
import { ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommandHandler } from './create-post/create-post.command.handler';
import { UpdatePostCommandHandler } from './update-post/update-post.command.handler';
import { DeletePostCommandHandler } from './delete-post/delete-post.command.handler';
import { SetPublishCommandHandler } from './set-publish/set-publish.command.handler';

export * from './create-post/create-post.command';
export * from './delete-post/delete-post.command';
export * from './set-publish/set-publish.command';
export * from './update-post/update-post.command';

export * from './create-post/create-post.command.handler';
export * from './delete-post/delete-post.command.handler';
export * from './set-publish/set-publish.command.handler';
export * from './update-post/update-post.command.handler';

export const POST_COMMAND_HANDLERS: Type<ICommandHandler>[] = [
  CreatePostCommandHandler,
  UpdatePostCommandHandler,
  DeletePostCommandHandler,
  SetPublishCommandHandler,
];
