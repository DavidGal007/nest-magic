import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CommentDto } from 'src/user/dto/comment.dto';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  //@HttpCode(200)
  //@UseGuards(AuthGuard('jwt'))
  @Post('make')
  async createComment(@CurrentUser() id: string, @Body() dto: CommentDto) {
    return this.commentService.create(+id, dto)
  }
}
