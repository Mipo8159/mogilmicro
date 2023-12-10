import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { PostFacade } from '../app-services/post.facade';

/* FACADE FACTORY */
export const postFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
  eventBus: EventBus,
) => new PostFacade(commandBus, queryBus, eventBus);
