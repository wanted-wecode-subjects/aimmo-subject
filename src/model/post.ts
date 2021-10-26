import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PaginationMetadata } from "./pagenation";
import { User } from "./user";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  public id: string;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @ManyToOne((type) => User, (user) => user.posts)
  public author: User;
}

export interface PostList {
  posts: Post[];
  meta: PaginationMetadata;
}
