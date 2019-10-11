import { Resolver, Subscription, Mutation, Query, Args } from '@nestjs/graphql';
import { Post } from './post.type';
import { PostService } from './post.service';
import { RequestScopedService } from './request-scoped.service';
import { PubSub } from 'graphql-subscriptions';

export const pubsub = new PubSub();

@Resolver('Post')
export class PostResolver {
  constructor(
    private readonly postService: PostService,
  ) // private readonly requestScopedService: RequestScopedService,
  {}

  @Query(returns => Post)
  async post(@Args('id') id: string): Promise<Post> {
    return this.postService.find('abc');
  }

  @Mutation(returns => Post)
  async createPost(@Args('text') text: string): Promise<Post> {
    const post = await this.postService.create();
    pubsub.publish('newPostId', { newPost: post.id });
    return post;
  }

  @Subscription(returns => Post, {
    async resolve(this: PostResolver, payload) {
      return this.postService.find(payload.newPostId);
    },
  })
  async subscribeToNewPost(): Promise<AsyncIterator<Post>> {
    return pubsub.asyncIterator('newPostId');
  }
}
