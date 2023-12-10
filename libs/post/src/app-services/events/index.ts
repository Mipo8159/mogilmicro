import { Type } from '@nestjs/common';
import { IEventHandler } from '@nestjs/cqrs';

export const POST_EVENT_HANDLERS: Type<IEventHandler>[] = [];
