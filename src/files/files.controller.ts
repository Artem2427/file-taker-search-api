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
import { OpenAiService } from '../common/services/open-ai.service';
import { ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';

@Controller('files')
export class FilesController {
  constructor(
    private readonly openAIService: OpenAiService,
    private readonly filesService: FilesService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.uploadFile(file);
  }

  // @Get('search')
  // async searchFiles(@Query('query') query: string): Promise<any[]> {
  //   return await this.filesService.searchFiles(query);
  // }

  @ApiQuery({ name: 'query', required: false, type: String })
  @Get('search')
  async search(@Query('query') query?: string): Promise<any> {
    console.log(query, 'query');

    const querySearch = await this.openAIService.search(query);
    const entities = await this.filesService.findFiles(query);
    return entities;
  }
}
