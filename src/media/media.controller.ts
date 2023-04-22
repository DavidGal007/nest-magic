import { Controller, HttpCode, Post, UseInterceptors, UploadedFile, Query, Req, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @HttpCode(200)
  @Post()
  //@UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('media'))
  async uploadMediaFile(
    //@Req() request: any,
    @UploadedFile() mediaFile: Express.Multer.File,
    @Query('folder') folder?: string
  ) {
    //const {id} = request.user
    return this.mediaService.saveMedia(mediaFile, folder, 1)
  }
}
