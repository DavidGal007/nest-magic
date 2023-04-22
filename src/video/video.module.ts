import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from 'src/typeorm/entities/Video';
import { AuthModule } from 'src/auth/auth.module';
import { Likes } from 'src/typeorm/entities/Likes';
import { User } from 'src/typeorm/entities/User';
import { GatewayModule } from 'src/gateway/gateway.model';
import { Unlikes } from 'src/typeorm/entities/Unlikes';

@Module({
  controllers: [VideoController],
  providers: [VideoService],
  imports: [AuthModule, GatewayModule, TypeOrmModule.forFeature([Video, Likes, User, Unlikes])]
})
export class VideoModule {}
