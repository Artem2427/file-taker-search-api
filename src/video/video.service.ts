import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entities/video.entity';
import { ILike, Repository } from 'typeorm';
import * as youtubeTranscript from 'youtube-transcript';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(Video) private videoRepository: Repository<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto) {
    const transkript = await this.getTranscription(createVideoDto.url);
    const video = new Video({ ...createVideoDto, captions: transkript });

    return await this.videoRepository.save(video);
  }
  async getTranscription(url: any) {
    const videoID = this.getYouTubeVideoID(url);
    const transkript =
      await youtubeTranscript.YoutubeTranscript.fetchTranscript(videoID);
    const caption = JSON.stringify(transkript);
    return caption;
  }

  getYouTubeVideoID(url: string) {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('v');
  }

  async search(serch: string) {
    const where = serch
      ? [
          { title: ILike(`%${serch?.toLowerCase()}%`) },
          {
            captions: ILike(`%${serch?.toLowerCase()}%`),
          },
        ]
      : [];

    const videos = await this.videoRepository.find({
      where,
    });

    console.log(serch, 'serch');

    const videoWithTimeCodes = videos.map((video) => {
      return {
        ...video,
        captions: !serch
          ? []
          : JSON.parse(video.captions)
              ?.filter((caption) =>
                caption.text?.toLowerCase().includes(serch?.toLowerCase()),
              )
              .map((caption) => {
                const startIndex = caption.text
                  .toLowerCase()
                  ?.indexOf(serch?.toLowerCase());
                const endIndex = startIndex + caption.text?.length - 1;

                return {
                  ...caption,
                  start: startIndex,
                  end: endIndex,
                };
              }),
      };
    });

    return videoWithTimeCodes;
  }
}
