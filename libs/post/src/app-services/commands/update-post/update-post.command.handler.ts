import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from './update-post.command';
import { PostAggregate } from '@lib/post/domain';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException, Logger } from '@nestjs/common';

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler
  implements ICommandHandler<UpdatePostCommand, PostAggregate>
{
  private readonly logger = new Logger(UpdatePostCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ post }: UpdatePostCommand): Promise<PostAggregate> {
    const postExists = await this.postRepository
      .findOne(post.id)
      .catch((err) => {
        this.logger.error(err);
        return null as PostAggregate;
      });

    if (!postExists)
      throw new BadRequestException(`Post by id ${post.id} not found`);
    Object.assign(postExists, post);

    const postAggregate = PostAggregate.create(postExists);
    postAggregate.plainToInstance(); // whitelist the waste

    await this.postRepository.save(postAggregate);
    return postAggregate;
  }
}
