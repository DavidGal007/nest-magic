import { User } from 'src/typeorm/entities/User'
import { Video } from 'src/typeorm/entities/Video'
import { Base } from 'src/utils/base'
import { Entity, ManyToOne, JoinColumn, Column } from 'typeorm'

@Entity('comments')
export class CommentEntity extends Base {
	@Column({ type: 'text' })
	message: string

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	user: User

	@ManyToOne(() => Video, video => video.comments, {onDelete: 'CASCADE' })
	@JoinColumn({ name: 'video_id' })
	video: Video
}
