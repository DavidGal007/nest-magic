import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Video } from "./Video"

@Entity({name: 'likes'})
export class Likes {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Video, video => video.likes, {onDelete: 'CASCADE'})
    videos: Video;

    @ManyToOne(() => User, user => user.likes)
    user: User;
}