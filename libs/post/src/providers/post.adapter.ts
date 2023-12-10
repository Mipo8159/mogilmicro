import { Injectable, Logger } from '@nestjs/common';
import { PostRepository } from './post.repository';
import { IPost, PostAggregate } from '../domain';
import { PaginationDto } from '@lib/shared/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '@lib/entities';
import { FindManyOptions, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

/* CONCRETE IMPLEMENTATION OF REPOSITORY CLASS */
@Injectable()
export class PostAdapter implements PostRepository {
  private readonly logger = new Logger(PostAdapter.name);
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepo: Repository<PostEntity>,
  ) {}

  // SAVE / UPDATE
  async save(post: IPost): Promise<PostAggregate> {
    const exists = await this.findOne(post.id);
    if (exists) {
      const { id, ...toUpdate } = post;
      await this.postRepo.update({ id }, toUpdate);
      return this.findOne(id);
    }

    const saved = await this.postRepo.save(post);
    return PostAggregate.create(saved);
  }

  // FIND ONE
  async findOne(id: string): Promise<PostAggregate> {
    const exists = await this.postRepo.findOneBy({ id }).catch((err) => {
      this.logger.error(err);
      return null;
    });

    if (!exists) return null;
    return PostAggregate.create(exists);
  }

  // FIND MANY
  async findAll(pagination: PaginationDto): Promise<[PostAggregate[], number]> {
    const { limit: take, offset: skip } = plainToInstance(
      PaginationDto,
      pagination,
    );
    const options: FindManyOptions = {
      where: { isPublished: true },
      take,
      skip,
      order: {
        createdAt: 'DESC',
      },
    };
    const [data, count] = await this.postRepo
      .findAndCount(options)
      .catch((err) => {
        this.logger.error(err);
        return [[], 0] as [PostEntity[], number];
      });
    return [data.map((post) => PostAggregate.create(post)), count];
  }

  // DELETE
  async delete(id: string): Promise<boolean> {
    const result = await this.postRepo.delete({ id }).catch((err) => {
      this.logger.error(err);
      return false;
    });
    return !!result;
  }
}
