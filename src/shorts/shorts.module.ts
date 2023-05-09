import { Module } from '@nestjs/common';
import { ShortsService } from './shorts.service';
import { ShortsController } from './shorts.controller';
import { ShortVideo } from 'src/typeorm/entities/ShortVideo';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ShortsController],
  providers: [ShortsService],
  imports: [TypeOrmModule.forFeature([ShortVideo])]
})
export class ShortsModule {}
