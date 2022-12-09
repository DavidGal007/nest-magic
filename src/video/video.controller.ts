import { Controller, Get, Post, Query, Param, HttpCode, Delete, Put, Body  } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { VideoDto } from 'src/user/dto/video.dto';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}


  @Get('get-private/:id')
  async getVideoPrivate(@Param('id') id: string) {
    return this.videoService.byId(+id)
  }

  @Get('most-popular')
  async getMostPopularViews() {
    return this.videoService.getMostPopularByViews()
  }

  @Get()
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.videoService.getAll(searchTerm)
  }

  @Get(':id')
  async getVideo(@Param('id') id: string) {
    return this.videoService.byId(+id)
  }

  @HttpCode(200)
  @Put(':id')
  async updateVideo(@Param('id') id: string, @Body() dto: VideoDto) {
    return this.videoService.updateVideo(+id, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteVideo(@Param('id') id: string) {
    return this.videoService.delete(+id)
  }

  @HttpCode(200)
  @Post()
  async createVideo(@CurrentUser('id') id: number) {
    return this.videoService.create(id)
  }

  @HttpCode(200)
  @Put('update-views/:videoId')
  async updateViews(@Param('videoId') videoId: string) {
    return this.videoService.updateCountViews(+videoId)
  }

  @HttpCode(200)
  @Put('update-likes/:videoId')
  async updateLikes(@Param('videoId') videoId: string) {
    return this.videoService.updateReaction(+videoId)
  }
}
