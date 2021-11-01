import { Column, Entity, ObjectID, ObjectIdColumn, OneToMany } from "typeorm";
import { Post } from "./post";

@Entity()
export class User {
  @ObjectIdColumn()
  public id: ObjectID;

  @Column({ unique: true })
  public username: string;

  @Column()
  public password: string;

  @OneToMany((type) => Post, (post) => post.author)
  public posts: Post[];
}
