import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { CommonModule } from 'src/common/common.module';
import { VideoModule } from 'src/video/video.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), CommonModule, VideoModule],
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {}
