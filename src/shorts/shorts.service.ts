import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyGateway } from 'src/gateway/gateway';
import { ShortVideo } from 'src/typeorm/entities/ShortVideo';
import { Repository } from 'typeorm';

@Injectable()
export class ShortsService {
  constructor(
    @InjectRepository(ShortVideo)
    private readonly shortVideoRepository: Repository<ShortVideo>,
    private readonly myGateway: MyGateway
  ) {
    
  }

  //userId: number
  async likeVideo(id: number, userId?: number): Promise<void> {
    
      const video = await this.shortVideoRepository.findOne({
        where: {
            id: id
        }
      });
      if (!video) {
        throw new NotFoundException(`Video with ID ${id} not found`);
      }
      const alreadyLiked = await this.shortVideoRepository.findOneBy({
        
            id: id
            
            
        
      })
      if(!alreadyLiked) {
        video.likes++;
      } else {
        video.likes--
      }
      

      await Promise.all([
        this.shortVideoRepository.save(video),
        this.myGateway.server.emit('liked', () => {
            console.log(`Broadcasting like event for video ${video.title} by user`);
        })
      ]);
  
  }

  async create(shortVideo: ShortVideo ): Promise<ShortVideo> {
    return await this.shortVideoRepository.save(shortVideo);
  }

  async getAllShorts() {
    return await this.shortVideoRepository.find()
  }

  async dislikeVideo(id: number): Promise<void> {
    
      const video = await this.shortVideoRepository.findOne({
        where: {id: id}
      });
      if (!video) {
        throw new NotFoundException(`Video with ID ${id} not found`);
      }
      video.dislike++;

      await Promise.all([
        this.shortVideoRepository.save(video),
        this.myGateway.server.emit('liked', (recived: any) => {
            console.log(`Broadcasting like event for video ${recived} by user`);
        })
      ]);
    
  }

//   private async broadcastLikeEvent(videoId: number, userId: number): Promise<void> {
//     const event = new LikeEvent(videoId, userId);
//     // code to broadcast the event to other services or subscribers
//     console.log(`Broadcasting like event for video ${videoId} by user ${userId}`);
//   }

//   private async broadcastDislikeEvent(videoId: number, userId: number): Promise<void> {
//     const event = new DislikeEvent(videoId, userId);
//     // code to broadcast the event to other services or subscribers
//     console.log(`Broadcasting dislike event for video ${videoId} by user ${userId}`);
//   }
}

