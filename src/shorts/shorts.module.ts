import { Module } from '@nestjs/common';
import { ShortsService } from './shorts.service';
import { ShortsController } from './shorts.controller';
import { ShortVideo } from 'src/typeorm/entities/ShortVideo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GatewayModule } from 'src/gateway/gateway.model';
import { MyGateway } from 'src/gateway/gateway';

@Module({
  controllers: [ShortsController],
  providers: [ShortsService, MyGateway],
  imports: [TypeOrmModule.forFeature([ShortVideo])]
})
export class ShortsModule {}
