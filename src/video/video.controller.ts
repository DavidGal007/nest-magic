import { Controller, Get, Post, Query, Param, HttpCode, Delete, Put, Body, UseGuards, Req  } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { VideoService } from './video.service';
import { VideoDto } from './dto/video.dto';

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
  @UseGuards(JwtAuthGuard)
  async createVideo(@Req() request: any, @Body() VideoDto: VideoDto) {
    const {id} = request.user
    return this.videoService.create(id, VideoDto)
  }

  @HttpCode(200)
  @Put('update-views/:videoId')
  async updateViews(@Param('videoId') videoId: string) {
    return this.videoService.updateCountViews(+videoId)
  }

  @HttpCode(200)
  @Post('update-likes/:videoId')
  async updateLikes(@Param('videoId') videoId: string) {
    return this.videoService.updateReaction(+videoId)
  }

  @HttpCode(200)
  @Post('update-unlikes/:videoId')
  async updateunLikes(@Param('videoId') videoId: string) {
    return this.videoService.dislikeReaction(+videoId)
  }
}
