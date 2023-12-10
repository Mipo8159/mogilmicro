import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SetPublishCommand } from './set-publish.command';
import { PostAggregate } from '@lib/post/domain';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException, Logger } from '@nestjs/common';

@CommandHandler(SetPublishCommand)
export class SetPublishCommandHandler
  implements ICommandHandler<SetPublishCommand, PostAggregate>
{
  private readonly logger = new Logger(SetPublishCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ id }: SetPublishCommand): Promise<PostAggregate> {
    const postExists = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as PostAggregate;
    });

    if (!postExists)
      throw new BadRequestException(`Post with id ${id} not found`);

    const postAggregate = PostAggregate.create(postExists);
    postAggregate.setPublished();
    postAggregate.plainToInstance(); // whitelist the waste
    await this.postRepository.save(postAggregate);

    return postAggregate;
  }
}
