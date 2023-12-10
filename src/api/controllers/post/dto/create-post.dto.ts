import { CreatePostDto } from '@lib/post/app-services/commands/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ICreatePostDto implements CreatePostDto {
  @IsUUID()
  authorId: string;

  @ApiProperty({ description: 'Post message', type: 'string' })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({ description: 'Post title', type: 'string' })
  @IsString()
  @IsNotEmpty()
  title: string;
}
