import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreatePostDto, UpdatePostDto } from './commands/dto';
import {
  CreatePostCommand,
  CreatePostCommandHandler,
  DeletePostCommand,
  DeletePostCommandHandler,
  SetPublishCommand,
  SetPublishCommandHandler,
  UpdatePostCommand,
  UpdatePostCommandHandler,
} from './commands';
import { PaginationDto } from '@lib/shared/dto';
import {
  GetPostQuery,
  GetPostQueryHandler,
  GetPostsQuery,
  GetPostsQueryHandler,
} from './queries';

@Injectable()
export class PostFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  commands = {
    createPost: (post: CreatePostDto) => this.createPost(post),
    updatePost: (post: UpdatePostDto) => this.updatePost(post),
    deletePost: (id: string) => this.deletePost(id),
    setPublish: (id: string) => this.setPublish(id),
  };
  queries = {
    getPost: (id: string) => this.getPost(id),
    getPosts: (pagination: PaginationDto) => this.getPosts(pagination),
  };
  events = {};

  /* COMMANDS */
  private createPost(post: CreatePostDto) {
    return this.commandBus.execute<
      CreatePostCommand,
      CreatePostCommandHandler['execute']
    >(new CreatePostCommand(post));
  }
  private updatePost(post: UpdatePostDto) {
    return this.commandBus.execute<
      UpdatePostCommand,
      UpdatePostCommandHandler['execute']
    >(new UpdatePostCommand(post));
  }
  private setPublish(id: string) {
    return this.commandBus.execute<
      SetPublishCommand,
      SetPublishCommandHandler['execute']
    >(new SetPublishCommand(id));
  }
  private deletePost(id: string) {
    return this.commandBus.execute<
      DeletePostCommand,
      DeletePostCommandHandler['execute']
    >(new DeletePostCommand(id));
  }

  /* QUERIES */
  private getPost(id: string) {
    return this.queryBus.execute<GetPostQuery, GetPostQueryHandler['execute']>(
      new GetPostQuery(id),
    );
  }
  private getPosts(pagination: PaginationDto) {
    return this.queryBus.execute<GetPostsQuery, GetPostsQueryHandler>(
      new GetPostsQuery(pagination),
    );
  }
}
