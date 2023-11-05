import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  Query,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

import { ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import { GetFilesQueryDto } from './dto/update-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

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

  @ApiQuery({ name: 'fileId', required: true, type: String })
  @Get('download')
  async getFile(@Query('fileId') fileId: string, @Res() res: Response) {
    return this.filesService.findOne(fileId, res);
  }

  @ApiQuery({ name: 'query', required: false, type: String })
  @Get('search')
  async search(@Query() query: GetFilesQueryDto): Promise<any> {
    // const querySearch = await this.openAIService.search(query);
    const entities = await this.filesService.findFiles(query);
    return entities;
  }
}
