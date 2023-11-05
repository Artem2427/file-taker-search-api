import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { OpenAiService } from 'src/common/services/open-ai.service';

@Controller('files')
export class FilesController {
  constructor(
    private readonly openAIService: OpenAiService,
    private readonly filesService: FilesService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.uploadFile(file);
  }

  // @Get('search')
  // async searchFiles(@Query('query') query: string): Promise<any[]> {
  //   return await this.filesService.searchFiles(query);
  // }

  @Get('search')
  async search(@Query('query') query: string): Promise<any> {
    const querySearch = await this.openAIService.search(query);
    const entities = await this.filesService.findFiles(querySearch);
    return entities;
  }
}
