import { AggregateRoot } from '@nestjs/cqrs';
import { ISetPublished, SET_PUBLISHED } from './set-published';
import { ISetNotPublished, SET_NOT_PUBLISHED } from './set-not-published';
import { PLAIN_TO_INSTANCE, PlainToInstance } from './plain-to-instance';

export class PostServices
  extends AggregateRoot
  implements ISetPublished, ISetNotPublished, PlainToInstance
{
  setPublished = SET_PUBLISHED;
  setNotPublished = SET_NOT_PUBLISHED;
  plainToInstance = PLAIN_TO_INSTANCE;
}
