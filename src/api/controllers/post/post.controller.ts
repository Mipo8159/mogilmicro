import { PostFacade } from '@lib/post/app-services';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ICreatePostDto, IUpdatePostDto } from './dto';
import { CurrentUser, Public } from '@lib/auth';
import { ICurrentUser } from '@lib/auth/interfaces/user.interface';
import { plainToInstance } from 'class-transformer';
import {
  ApiOkResponsePaginated,
  PaginationDto,
  ResponseWithPagination,
} from '@lib/shared';
import { PostAggregate } from '@lib/post';
import { JwtGuard } from '@lib/auth/guards/jwt.guard';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PostResponse } from './response/post.response';

@ApiTags('Posts')
@UseGuards(JwtGuard)
@Controller('posts')
export class PostController {
  constructor(private readonly postFacade: PostFacade) {}

  @ApiOperation({ summary: 'Create post' })
  @ApiBearerAuth()
  @ApiOkResponse({ type: PostResponse })
  @Public()
  @Get()
  async getPosts(
    @Query() paginationDto: PaginationDto,
  ): Promise<ResponseWithPagination<PostAggregate>> {
    const pagination = plainToInstance(PaginationDto, paginationDto);
    // @ts-ignore
    const [data, count] = await this.postFacade.queries.getPosts(pagination);
    return {
      ...pagination,
      data,
      total: count,
    };
  }

  @ApiOperation({ summary: 'Get post by id' })
  @ApiOkResponse({ type: PostResponse })
  @Public()
  @Get(':id')
  getPost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.queries.getPost(id);
  }

  @ApiOperation({ summary: 'Get posts pagination' })
  @ApiOkResponsePaginated(PostResponse)
  @Post()
  createPost(
    @CurrentUser() user: ICurrentUser,
    @Body() createPostDto: ICreatePostDto,
  ) {
    return this.postFacade.commands.createPost({
      ...createPostDto,
      authorId: user.userId,
    });
  }

  @ApiOperation({ summary: 'Update post' })
  @ApiOkResponse({ type: PostResponse })
  @Put('update/:id')
  updatePost(
    @CurrentUser() user: ICurrentUser,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: IUpdatePostDto,
  ) {
    return this.postFacade.commands.updatePost({
      id,
      ...updatePostDto,
      authorId: user.userId,
    });
  }

  @ApiOperation({ summary: 'Delete post' })
  @ApiOkResponse({ type: 'boolean' })
  @Delete('delete/:id')
  deletePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.deletePost(id);
  }

  @ApiOperation({ summary: 'Publish post' })
  @ApiOkResponse({ type: PostResponse })
  @Patch('publish/:id')
  publishPost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postFacade.commands.setPublish(id);
  }
}
