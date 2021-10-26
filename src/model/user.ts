import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Post } from "./post";

@Entity()
export class User {
  @PrimaryColumn()
  public id: string;

  @Column()
  public password: string;

  @Column()
  public name: string;

  @OneToMany((type) => Post, (post) => post.author)
  public posts: Post[];
}
