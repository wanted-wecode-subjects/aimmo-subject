import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn } from "typeorm";
import { PaginationMetadata } from "./pagenation";
import { User } from "./user";

@Entity()
export class Post {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @ManyToOne((type) => User, (user) => user.posts, { cascade: true })
  public author: User;
}

export interface PostList {
  posts: Post[];
  meta: PaginationMetadata;
}
