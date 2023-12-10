import { IPost } from '@lib/post';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostResponse implements Omit<IPost, 'isPublished'> {
  @Field(() => ID, { description: 'Post id' })
  id: string;

  @Field({ description: 'Post title' })
  title: string;

  @Field({ description: 'Post message' })
  message: string;

  @Field({ description: 'Author id' })
  authorId: string;

  @Field({ description: 'Create Date' })
  createdAt: string;

  @Field({ description: 'Update Date' })
  updatedAt: string;
}
