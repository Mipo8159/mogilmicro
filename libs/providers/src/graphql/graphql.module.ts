import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { apolloDriverConfig } from './apollo-driver.config';

@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>(apolloDriverConfig)],
})
export class GraphqlModule {}
