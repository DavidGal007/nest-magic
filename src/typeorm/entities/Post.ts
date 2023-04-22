import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../Base";
import { User } from "./User";


@Entity({name: 'user_posts'})
export class Post extends Base {

    @Column()
    title: string;

    @Column()
    desciption: string;

    @ManyToOne(() => User, (user) => user.posts)
    user: User
}