import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User"
import { Video } from "./Video"

@Entity({name: 'unlikes'})
export class Unlikes {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Video, video => video.unlikes, {onDelete: 'CASCADE'})
    videos: Video;

    @ManyToOne(() => User, user => user.unlikes)
    user: User;
}