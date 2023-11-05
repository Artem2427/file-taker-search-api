import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';
import * as pdf from 'pdf-parse';
import { Readable } from 'stream';
import * as csvParser from 'csv-parser';
import * as mammoth from 'mammoth';
import { Response } from 'express';
import * as XLSX from 'xlsx';
import { VideoService } from 'src/video/video.service';
import { Filter, GetFilesQueryDto } from './dto/update-file.dto';
@Injectable()
export class FilesService {
  constructor(
    private readonly videoService: VideoService,
    @InjectRepository(File) private readonly _repository: Repository<File>,
  ) {}

  async findFiles(getFilesQueryDto: GetFilesQueryDto) {
    let { search, filter, format } = getFilesQueryDto;
    let files = [];
    if (!filter || filter === Filter.File) {
      const query = this._repository
        .createQueryBuilder('file')
        .select([
          'file.id',
          'file.title',
          'file.size',
          'file.mimeType',
          'file.originalName',
          'file.trancription',
        ]);

      if (search) {
        query
          .where('file.title ILIKE :search', { search: `%${search}%` })
          .orWhere('file.trancription ILIKE :search', {
            search: `%${search}%`,
          });
      }

      let formats: string[] = [];
      if (format) {
        switch (format) {
          case 'pdf':
            formats = ['application/pdf'];
            break;

          case 'csv':
            formats = ['text/csv'];
            break;

          case 'xlsx':
            formats = [
              'application/vnd.ms-excel',
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
              'application/vnd.ms-excel.sheet.macroEnabled.12',
            ];
            break;

          case 'docx':
            formats = [
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
              'application/msword',
            ];
            break;

          case 'yaml':
            formats = ['text/yaml', 'text/x-yaml', 'application/x-yaml'];
            break;
        }

        query.andWhere('file.mimeType IN(:...formats)', { formats });
      }
      console.log(search);
      files = (await query.getMany()).map((file) => {
        if (search) {
          const startIndex = file.trancription
            .toLowerCase()
            ?.indexOf(search?.toLowerCase());
          const endIndex = startIndex + search.length - 1;

          return {
            ...file,
            trancription: file.trancription?.slice(
              startIndex > 50 ? startIndex - 50 : 0,
              endIndex < file.trancription.length - 50
                ? endIndex + 50
                : file.trancription.length,
            ),
            startIndex: startIndex,
            endIndex: endIndex,
          };
        }
        return file;
      });
    }

    const video =
      filter === Filter.File ? await this.videoService.search(search) : [];

    return {
      files: files,
      videos: video,
      totalCount: files.length + video.length,
    };
  }

  async findOne(id: string, res: Response) {
    const file = await this._repository.findOneBy({ id });

    if (!file) {
      throw new HttpException('File not found', 404);
    }

    const buffer = file.buffer;
    const filename = file.originalName;

    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': buffer.length,
    });

    res.status(HttpStatus.OK).send(buffer);
  }

  async uploadFile(fileData: Express.Multer.File): Promise<any> {
    let text: string;

    switch (fileData.mimetype) {
      case 'application/pdf':
        text = await pdf(fileData.buffer);
        break;

      case 'text/csv':
        text = await this.parseCsvToText(fileData.buffer);
        break;

      case 'application/vnd.ms-excel':
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      case 'application/vnd.ms-excel.sheet.macroEnabled.12':
        text = this.extractTextFromExcel(fileData.buffer);
        break;

      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      case 'application/msword':
        text = await this.extractTextFromDocx(fileData.buffer);
        break;

      case 'text/yaml':
      case 'text/x-yaml':
      case 'application/x-yaml':
        text = fileData.buffer.toString('utf8');
        break;
    }

    const fileEntity = this._repository.create({
      title: fileData.originalname,
      trancription: text,
      originalName: fileData.originalname,
      mimeType: fileData.mimetype,
      size: fileData.size,
      buffer: fileData.buffer,
    });

    const file = await this._repository.save(fileEntity);
    return file;
  }

  async extractTextFromDocx(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value;
    return text;
  }

  extractTextFromExcel(buffer: Buffer): string {
    const workbook = XLSX.read(buffer, { type: 'buffer' });

    const textArray = [];

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      for (let cell in worksheet) {
        if (cell.startsWith('!')) continue;

        const cellValue = worksheet[cell].v;
        textArray.push(cellValue);
      }
    });

    return textArray.join(' ');
  }

  parseCsvToText(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const results = [];
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null);

      stream
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          const textData = results.map((row) => JSON.stringify(row)).join('\n');
          resolve(textData);
        })
        .on('error', (error) => reject(error));
    });
  }

  // async searchFiles(query: string): Promise<any[]> {
  //   const aiProcessedQuery = await this.openAIService.search(query);

  //   // Use the processed query to search your database
  //   const files = await this._repository.find({
  //     where: [
  //       { title: ILike(`%${aiProcessedQuery}%`) },
  //       { trancription: ILike(`%${aiProcessedQuery}%`) },
  //       // ...other searchable fields
  //     ],
  //   });

  //   // Map over the files and obtain summaries (consider doing this in a paginated way or for top results only)
  //   const filesWithSummaries = await Promise.all(
  //     files.map(async (file) => {
  //       // Assume the file content is directly accessible. If it's a URL or stored externally, you'll need to fetch it first.
  //       // const summary = await this.openAIService.summarize(file.content); // Simplified for brevity

  //       return {
  //         ...file,
  //         summary, // Add the summary to the file object
  //       };
  //     }),
  //   );

  //   return filesWithSummaries;
  // }

  // async getFileSummary(fileId: string): Promise<string> {
  //   // Here, you would fetch the file's content. For example, this could be a text field in your database,
  //   // or you might need to download the file from a storage service and extract the text.
  //   // This example assumes that you have a method to get file content by its ID.
  //   // const fileContent = await this.getFileContent(fileId);

  //   // Now call the OpenAI service to get the summary
  //   const summary = await this.openAIService.summarize(fileContent);
  //   return summary;
  // }

  // Implement getFileContent that retrieves file's content based on fileId
  // private async getFileContent(fileId: string): Promise<any> {
  //   const file = await this._repository.findOne({ where: { id: fileId } });

  //   if (!file) {
  //     throw new Error('File not found');
  //   }

  // If file's content is a URL, fetch the content
  // if (file.contentUrl) {
  //   const response = await this.httpService.get(file.contentUrl).toPromise();
  //   return response.data; // Ensure you handle different file types and content extraction
  // }

  // If file's content is stored directly in your database or another field
  // return that content directly
  // return file.content; // Assuming 'content' is a field in your 'File' entity
  // }
}
