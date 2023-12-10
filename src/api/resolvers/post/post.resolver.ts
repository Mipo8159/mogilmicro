import { Args, Query, Resolver } from '@nestjs/graphql';
import { PostResponse } from '../responses/post.response';
import { PostFacade } from '@lib/post/app-services';

@Resolver(() => PostResponse)
export class PostResolver {
  constructor(private readonly postFacade: PostFacade) {}

  @Query(() => PostResponse, { name: 'getPost' })
  getPost(@Args('id') id: string) {
    return this.postFacade.queries.getPost(id);
  }

  //   @Query(() => PaginatedPosts, { name: 'getPosts' })
  //   async getPosts(@Args() paginationDto: PaginationDto) {
  //     const pagination = plainToInstance(PaginationDto, paginationDto);

  //     // @ts-ignore
  //     const [data, count] = await this.postFacade.queries.getPosts(paginationDto);

  //     return {
  //       ...pagination,
  //       data,
  //       total: count,
  //     };
  //   }
}
