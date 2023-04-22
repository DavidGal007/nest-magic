import { Module, forwardRef } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { Subscription } from 'src/typeorm/entities/Subscription';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [AuthModule, TypeOrmModule.forFeature([CommentEntity, Subscription])],
  
  
})
export class CommentModule {}
