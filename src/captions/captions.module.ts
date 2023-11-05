import { Module } from '@nestjs/common';
import { CaptionsService } from './captions.service';
import { CaptionsController } from './captions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Caption } from './entities/caption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Caption])],
  controllers: [CaptionsController],
  providers: [CaptionsService],
})
export class CaptionsModule {}
