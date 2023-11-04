import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { OpenAiService } from 'src/common/services/open-ai.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly openAIService: OpenAiService,
    private readonly filesService: FilesService,
  ) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {}

  // @Get('search')
  // async searchFiles(@Query('query') query: string): Promise<any[]> {
  //   return await this.filesService.searchFiles(query);
  // }

  @Get()
  async search(@Query('query') query: string): Promise<any> {
    return await this.openAIService.search(query);
  }
}
