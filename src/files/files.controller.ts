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

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.uploadFile(file);
  }

  // @Get('search')
  // async searchFiles(@Query('query') query: string): Promise<any[]> {
  //   return await this.filesService.searchFiles(query);
  // }

  // @Get('search')
  // async search(@Query('query') query: string): Promise<any> {
  //   const querySearch = await this.openAIService.search(query);
  //   console.log(querySearch);
  //   // const entities = await this.filesService.findFiles(querySearch);
  //   // return entities;
  // }
}
