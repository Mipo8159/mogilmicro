import { IPost } from '@lib/post';
import { ApiProperty } from '@nestjs/swagger';
import { v4 } from 'uuid';

export class PostResponse implements Omit<IPost, 'isPublished'> {
  @ApiProperty({ description: 'Post id', type: 'string', example: v4() })
  id: string;

  @ApiProperty({ description: 'Post title', type: 'string' })
  title: string;

  @ApiProperty({ description: 'Post message', type: 'string' })
  message: string;

  @ApiProperty({ description: 'Author id', type: 'string' })
  authorId: string;

  @ApiProperty({
    description: 'Post created at',
    type: 'string',
    example: new Date().toISOString(),
  })
  createdAt: string;

  @ApiProperty({
    description: 'Post updated at',
    type: 'string',
    example: new Date().toISOString(),
  })
  updatedAt: string;
}
