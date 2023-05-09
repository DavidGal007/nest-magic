import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from 'src/typeorm/entities/Subscription';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(CommentEntity)
		private readonly commentRepository: Repository<CommentEntity>,
        @InjectRepository(Subscription)
		private readonly subscriptonRepository: Repository<Subscription>
    ) {}

    async create(id: number, dto: CommentDto) {
        
        const newComment = this.commentRepository.create({
            message: dto.message,
            video: {id: dto.videoId},
            user: {id: id}
        })

        return this.commentRepository.save(newComment)
    }

    async subscribe(id: number, channelId: number) {
        console.log({userId: id });
        
		const data = {
			toChannel: { id: channelId },
			fromUser: { id }
		}
		const isSubscribed = await this.subscriptonRepository.findOneBy(data)

		if (!isSubscribed) {
			const newSubscription = await this.subscriptonRepository.create(data)
			await this.subscriptonRepository.save(newSubscription)
            
			return true
		}

		await this.subscriptonRepository.delete(data)
		return false
	}
}
