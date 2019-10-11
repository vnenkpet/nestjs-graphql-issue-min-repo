import { Post } from './post.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
  async create(): Promise<Post> {
    return {
      id: 'abc',
      text: 'blah',
    };
  }

  async find(id: string): Promise<Post> {
    return {
      id: 'abc',
      text: 'blah',
    };
  }
}
