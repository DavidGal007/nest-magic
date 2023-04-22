import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { IMediaInterface } from './media.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { Video } from 'src/typeorm/entities/Video';
import * as fs from 'fs/promises'

const buff = Buffer.alloc(100);
const header = Buffer.from("mvhd");

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Video)
        private readonly videoRepository: Repository<Video>,
    ) { }
    public parseVideoDuration(buffer) {
        const durationRegex = /duration\W+([\d\.]+)/i;
        const result = durationRegex.exec(buffer.toString());

        if (!result || result.length < 2) {
            return 0;
        }

        const duration = parseFloat(result[1]);

        return duration;
    }

    async getVideoDuration(filePath: any) {
        const file = await fs.open(filePath, "r");
        const { buffer } = await file.read(buff, 0, 100, 0);

        await file.close();

        const start = buffer.indexOf(header) + 17;
        const timeScale = buffer.readUInt32BE(start);
        const duration = buffer.readUInt32BE(start + 4);

        const audioLength = Math.floor((duration / timeScale) * 1000) / 1000;

        console.log(duration);
    }



    async saveMedia(
        mediaFile: Express.Multer.File,
        folder = 'default',
        id: number
    ): Promise<IMediaInterface> {
        const uploadFolder = `${path}/uploads/${folder}`
        await ensureDir(uploadFolder)

        await writeFile(
            `${uploadFolder}/${mediaFile.originalname}`,
            mediaFile.buffer
        )

        if (folder == 'avatar') {
            await this.userRepository.createQueryBuilder().update(User).set({
                avatarPath: `/uploads/${folder}/${mediaFile.originalname}`
            }).where("id = :id", { id: id }).execute()
            return {
                url: `/uploads/${folder}/${mediaFile.originalname}`,
                name: 'Changet'
            }
        } else {
        
            this.getVideoDuration(`${path}/uploads/${folder}/${mediaFile.originalname}`)
        
            
            //const videoPathorg = `/${folder}/${mediaFile.originalname}`
            // this.getVideoDuration(`${path}/uploads/${folder}/${mediaFile.originalname}`)
            //     .then((duration) => {
            //         // write duration to your database here
            //         console.log(`The video duration is ${duration} seconds`);
            //     })
            //     .catch((err) => {
            //         console.error(err);
            //     });

            // return {
            //     url: `/uploads/${folder}/${mediaFile.originalname}`,
            //     name: mediaFile.originalname
            // }

        }


    }
}
