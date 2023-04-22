import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}


    findUsers() {
        return this.userRepository.find({
            relations: {
                videos: true,
                likes: {
                    user: true,
                    videos: true
                },
                subscribers: {
                    fromUser: true
                },
                subscriptions: {
                  toChannel: true
                }
            }, 
            
        });
    }

    async byId(id: number) {


        const user = await this.userRepository.findOne({
            where: {
                id
            },
            relations: {
                videos: true,
                subscriptions: {
                    toChannel: true
                },
                subscribers: {
                    fromUser: true
                }
            },
            order: {
                createdAt: 'DESC'
            }
        })


        if (!user) throw new NotFoundException('User not found!')


        return user
    }
}
