import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class Post {
  @Field(type => ID)
  id: string;

  @Field()
  text: string;
}
