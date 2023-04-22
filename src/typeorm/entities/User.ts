import { Column,  Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "../Base";
import { BankAccount } from "./BankAccount";
import { Post } from "./Post";
import { Profile } from "./Profile";
import { ShortVideo } from "./ShortVideo";
import { Subscription } from "./Subscription";
import { Video } from "./Video";
import { Likes } from "./Likes";
import { Unlikes } from "./Unlikes";

@Entity({name: 'users'})
export class User extends Base {
   
    @Column({ unique: true, nullable: true })
    username?: string;

    @Column({unique: true})
    email: string

    @Column({ nullable: true})
    password: string;

    @Column({default: ''})
    displayName?: string;
    
    @Column({ nullable: true})
    authStrategy: string;

    @Column({default: false, name: 'is_verified'})
    isVerified: boolean

    @Column({default: 0, name: 'subscribers_count'})
    subscribersCount?: number

    @Column({default: ''})
    description: string

    @Column({default: '', name: 'avatar_path'})
    avatarPath: string

    @OneToOne(() => Profile)
    @JoinColumn()
    profile: Profile;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[]

    @OneToMany(() => Video, video => video.user)
    videos: Video[]

    @OneToMany(() => Subscription, sub => sub.fromUser)
    subscriptions: Subscription[]

    @OneToMany(() => Subscription, sub => sub.toChannel)
    subscribers: Subscription[]

    @Column({nullable: true, type: 'text'})
    address: string

    @OneToMany(() => ShortVideo, video => video.channel)
    shorts: ShortVideo[]

    @OneToMany(() => BankAccount, bankAccount => bankAccount.user, {cascade: true})
    bankAccounts: BankAccount[]

    @OneToMany(() => Likes, like => like.user)
    likes: Likes[];

    @OneToMany(() => Unlikes, unlike => unlike.user)
    unlikes: Unlikes[];

}