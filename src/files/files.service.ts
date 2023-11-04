import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { OpenAiService } from 'src/common/services/open-ai.service';

@Injectable()
export class FilesService {
  constructor() // private readonly openAIService: OpenAiService,
  // private readonly httpService: HttpService,
  // @InjectRepository(File) private _repository: Repository<File>,
  {}

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
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
