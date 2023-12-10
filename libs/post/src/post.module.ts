import { PostEntity } from '@lib/entities';
import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { POST_COMMAND_HANDLERS } from './app-services/commands';
import { POST_QUERY_HANDLERS } from './app-services/queries';
import { POST_EVENT_HANDLERS } from './app-services/events';
import { PostFacade } from './app-services';
import { PostRepository, postFacadeFactory } from './providers';
import { PostAdapter } from './providers/post.adapter';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([PostEntity])],
  providers: [
    ...POST_COMMAND_HANDLERS,
    ...POST_QUERY_HANDLERS,
    ...POST_EVENT_HANDLERS,
    {
      provide: PostFacade, // PostFacade provides postFacadeFactory fn()
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: postFacadeFactory,
    },
    {
      provide: PostRepository, // PostRepository provides PostAdapter cls()
      useClass: PostAdapter,
    },
  ],
  exports: [PostFacade],
})
export class PostModule {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  onModuleInit() {
    this.commandBus.register(POST_COMMAND_HANDLERS);
    this.queryBus.register(POST_QUERY_HANDLERS);
    this.eventBus.register(POST_EVENT_HANDLERS);
  }
}
