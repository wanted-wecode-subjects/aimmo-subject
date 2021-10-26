import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user";

@Entity()
export default class Post {
  @PrimaryGeneratedColumn()
  public id: string;
  @Column()
  public content: string;

  @ManyToOne((type) => User)
  public author: User;
}
