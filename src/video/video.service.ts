import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { ILike, Repository } from 'typeorm';
import * as youtubeTranscript from 'youtube-transcript';
import { Caption } from 'src/captions/entities/caption.entity';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto) {
    const transkript = await this.getTranscription(createVideoDto.url);

    const video = this.videoRepository.create({
      ...createVideoDto,
      captions: transkript,
    });

    return this.videoRepository.save(video);
  }

  getYouTubeVideoID(url: string) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  }

  async getTranscription(url: any) {
    const videoID = this.getYouTubeVideoID(url);
    const transkript =
      await youtubeTranscript.YoutubeTranscript.fetchTranscript(videoID);
    return transkript.map((item) => {
      return new Caption(item);
    });
  }

  async search(serch: string) {
    const video = await this.videoRepository.find({
      where: [
        { title: ILike(`%${serch}%`) },
        {
          captions: {
            text: ILike(`%${serch}%`),
          },
        },
      ],
      relations: {
        captions: true,
      },
    });

    console.log(video);

    return video;
  }
}
