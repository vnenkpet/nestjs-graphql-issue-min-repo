import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    PostModule,
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: 'schema.gql',
      installSubscriptionHandlers: true,
    }),
  ],
})
export class AppModule {}
