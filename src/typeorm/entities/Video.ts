import { CommentEntity } from 'src/comment/comment.entity'
import { Entity, ManyToOne, JoinColumn, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Base } from '../Base'
import { User } from './User'
import { Likes } from './Likes'
import { Unlikes } from './Unlikes'

@Entity('video')
export class Video extends Base {

  @Column({ nullable: false, default: '' })
  name: string

  @Column({ default: false })
  isPublic: boolean

  @Column({ default: 0 })
  views?: number

  @OneToMany(() => Likes, like => like.videos, { cascade: true })
  likes: Likes[];

  @OneToMany(() => Unlikes, unlike => unlike.videos, { cascade: true })
  unlikes: Unlikes[];

  @Column({ default: 0 })
  likeCount?: number

  @Column({ default: 0 })
  dislikes?: number

  @Column({ default: 0 })
  duration?: number

  @Column({ default: '' })
  description: string

  @Column({ default: '', name: 'video_path' })
  videoPath: string

  @Column({ default: '', name: 'thumbnail_path' })
  thumbnailPath: string

  @ManyToOne(() => User, user => user.videos, { cascade: true })
  @JoinColumn()
  user: User

  @OneToMany(() => CommentEntity, comment => comment.video, { cascade: true})
  comments: CommentEntity[]
}