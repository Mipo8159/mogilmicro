import { Module } from '@nestjs/common';
import { TypeormModule } from './typeorm/typeorm.module';
import { GraphqlModule } from './graphql/graphql.module';

@Module({
  imports: [TypeormModule, GraphqlModule],
})
export class ProvidersModule {}
