import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path';
import { User } from 'src/typeorm/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { Video } from 'src/typeorm/entities/Video';

@Module({
  imports: [
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads'
    }),
    TypeOrmModule.forFeature([User, Video])
  ],
  controllers: [MediaController],
  providers: [MediaService]
})
export class MediaModule {}
