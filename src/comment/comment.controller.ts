import { Controller, HttpCode, Post, Body, UseGuards, Req, Patch, Param } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CommentDto } from 'src/user/dto/comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @HttpCode(200)
  @Post('make')
  @UseGuards(JwtAuthGuard)
  async createComment(@Req() request: any, @Body() dto: CommentDto) {
    const {id} = request.user;
    return await this.commentService.create(id, dto)
  }

  @HttpCode(200)
  @Patch('subscribe/:channelId')
  @UseGuards(JwtAuthGuard)
  async subscribeToChannel(@Req() request: any, @Param('channelId') channelId: string) {
    const {id} = request.user
    return this.commentService.subscribe(id, +channelId)
  }
}
