import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Video } from 'src/typeorm/entities/Video'
import { VideoDto } from 'src/user/dto/video.dto'
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm'
import { VidoeItemDto } from './dto/VideoDto'
import { Likes } from 'src/typeorm/entities/Likes'
import { User } from 'src/typeorm/entities/User'
import { MyGateway } from 'src/gateway/gateway'
import fs from 'fs'
import { exec } from 'child_process'
import { Unlikes } from 'src/typeorm/entities/Unlikes'

@Injectable()
export class VideoService {
    constructor(
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
        @InjectRepository(Likes)
        private readonly likesRepository: Repository<Likes>,
        @InjectRepository(Unlikes)
        private readonly dislikeRepository: Repository<Unlikes>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        //private readonly myWebSocketGateway: MyGateway
    ) { }

    async byId(id: number, isPublic = false) {
        const video = await this.videoRepository.findOne({
            where: isPublic ? {
                id, isPublic: true
            } : {
                id
            },
            relations: {
                user: true,
                comments: true,
                likes: {
                    user: true,
                },
                unlikes: {
                    user: true
                }
            },
            select: {
                user: {
                    id: true,
                    username: true,
                    avatarPath: true,
                    isVerified: true,
                    subscribersCount: true,

                },
                comments: {
                    message: true,
                    id: true,
                    user: {
                        id: true,
                        username: true,
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
        let options: FindOptionsWhereProperty<Video> = {}

        if (searchTerm)
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

            },
            select: {
                user: {
                    id: true,
                    username: true,
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
                    username: true,
                    avatarPath: true,
                    isVerified: true
                }
            },
            order: {
                views: -1
            }

        })
    }

    public getVidoeDuration(path: any) {
        return new Promise((resolve, reject) => {
            fs.access(path, fs.constants.F_OK, (err) => {
                if (err) {
                    reject('Video file does not exist!');
                } else {
                    const command = `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 ${path}`;
                    exec(command, (error, stdout, stderr) => {
                        if (error) {
                            reject(`Command failed: ${error.message}`);
                        } else if (stderr) {
                            reject(`Command failed with error: ${stderr}`);
                        } else {
                            const duration = parseFloat(stdout);
                            resolve(duration);
                        }
                    })
                }
            })
        })
    }

    async create(id: number, videoDetails: VidoeItemDto) {
        const defaultValue = {
            user: { id: id },
            ...videoDetails
        }

        const newVideo = await this.videoRepository.create(defaultValue)
        const vidoe = await this.videoRepository.save(newVideo)
        return vidoe.id
    }

    async delete(id: number) {
        return this.videoRepository.delete(id);
    }

    async updateCountViews(id: number) {
        const vidoe = await this.byId(id)
        vidoe.views++
        return this.videoRepository.save(vidoe)
    }

    async updateReaction(id: number) {
        const userId = 1;

        const video = await this.videoRepository.findOne({
            where: { id: id }, relations: {
                user: true,
                likes: {
                    user: true,
                    videos: true,
                },
            }

        });
        if (!video) {
            throw new Error(`Video with id ${id} not found`);
        }

        let data = {
            user: { id: userId },
            videos: { id: id }
        }

        const alreadyLiked: boolean = video.likes.some(like => like.user.id === userId);
        if (alreadyLiked) {
            await this.likesRepository.delete(data)
            await this.videoRepository.createQueryBuilder().update(Video).set({
                likeCount: () => "likeCount - 1",
            }).where("id = :id", { id: id }).execute();
            console.log("Video has been unliked");

            return false
        } else {
            const SaveFrom = await this.likesRepository.create(data)
            await this.videoRepository.createQueryBuilder().update(Video).set({
                likeCount: () => "likeCount + 1",
            }).where("id = :id", { id: id }).execute();
            await this.likesRepository.save(SaveFrom)
            console.log("Video has been liked");

            return true
        }


    }

    async dislikeReaction(id: number) {
        const userId = 1;

        const video = await this.videoRepository.findOne({
            where: { id: id }, relations: {
                user: true,
                unlikes: {
                    user: true,
                    videos: true,
                },
            }

        });
        if (!video) {
            throw new Error(`Video with id ${id} not found`);
        }

        let data = {
            user: { id: userId },
            videos: { id: id }
        }

        const alreadyunLiked: boolean = video.unlikes.some(unlike => unlike.user.id === userId);
        if (alreadyunLiked) {
            await this.dislikeRepository.delete(data)
            await this.videoRepository.createQueryBuilder().update(Video).set({
                dislikes: () => "dislikes - 1",
            }).where("id = :id", { id: id }).execute();
            console.log("poshmaneci");

            return false
        } else {
            const SaveFrom = await this.dislikeRepository.create(data)
            await this.videoRepository.createQueryBuilder().update(Video).set({
                dislikes: () => "dislikes + 1",
            }).where("id = :id", { id: id }).execute();
            await this.dislikeRepository.save(SaveFrom)
            console.log("Video has been disliked");

            return true
        }


    }
}
