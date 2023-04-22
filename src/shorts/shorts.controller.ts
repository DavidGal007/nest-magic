import { Controller, Post, Param, HttpCode, Body, Get } from '@nestjs/common';
import { ShortVideo } from 'src/typeorm/entities/ShortVideo';
import { ShortsService } from './shorts.service';

@Controller('shorts')
export class ShortsController {

  constructor(private readonly shortsService: ShortsService) {}


  @Post(':id/like')
  async likeVideo(@Param('id') id: number): Promise<void> {
    await this.shortsService.likeVideo(id);
  }

  @Post(':id/dislike')
  async dislikeVideo(@Param('id') id: number): Promise<void> {
    await this.shortsService.dislikeVideo(id);
  }

  @HttpCode(200)
  @Post()
  //@UploadedFile() video: Express.Multer.File,
  async create(@Body() body: ShortVideo): Promise<ShortVideo> {
    return await this.shortsService.create(body);
  }

  @Get()
  async getAll() {
    return this.shortsService.getAllShorts()
  }
}
