import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { VideoDto } from 'src/user/dto/video.dto'
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm'
import { VideoEntity } from './video.entity'

@Injectable()
export class VideoService {
	constructor(
		@InjectRepository(VideoEntity)
		private readonly videoRepository: Repository<VideoEntity>
	) {}

	async byId(id: number, isPublic = false) {
		const video = await this.videoRepository.findOne({
			where: isPublic ? {
				id, isPublic: true
			} : {
                id
            },
			relations: {
				user: true,
                comments: {
                    user: true
                }
			},
			select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true,
                    subscribersCount: true,
                    subscriptions: true
                },
                comments: {
                    message: true,
                    id: true,
                    user: {
                        id: true,
                        name: true,
                        avatarPath: true,
                        isVerified: true,
                        subscribersCount: true
                    }
                }
            }
		})
		if (!video) throw new NotFoundException('Video not found')
		return video
	}
	async updateVideo(id: number, dto: VideoDto) {
		const video = await this.byId(id)

        return this.videoRepository.save({
            ...video, ...dto
        })
		
	}

	

	async getAll(searchTerm?: string) {
		let options: FindOptionsWhereProperty<VideoEntity> = {}

        if(searchTerm )
        options = {
            name: ILike(`%${searchTerm}%`)
        }

        return this.videoRepository.find({
            where: {
                ...options,
                isPublic: true
            },
            order: {
                createdAt: 'DESC'
            },
            relations: {
                user: true,
                comments: {
                    user: true
                }
            },
            select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true
                }
            }
        })
	}

    async getMostPopularByViews() {
        return this.videoRepository.find({
            where: {
                views: MoreThan(0)
            },
            relations: {
                user: true
            },
            select: {
                user: {
                    id: true,
                    name: true,
                    avatarPath: true,
                    isVerified: true
                }
            },
            order: {
                views: -1
            }

        })
    }

    async create(userId: number) {
        const defaultValue = {
            name: '',
            user: {id: userId},
            videoPath: '',
            description: '',
            thumbnailPath: ''
        }

        const newVideo = await this.videoRepository.create(defaultValue)
        const vidoe = await this.videoRepository.save(newVideo)
        return vidoe.id
    }

    async delete(id: number) {
        return this.videoRepository.delete({id})
    }

    async updateCountViews(id: number) {
        const vidoe = await this.byId(id)
        vidoe.views++
        return this.videoRepository.save(vidoe)
    }

    async updateReaction(id: number) {
        const vidoe = await this.byId(id)
        vidoe.likes++
        return this.videoRepository.save(vidoe)
    }
}
