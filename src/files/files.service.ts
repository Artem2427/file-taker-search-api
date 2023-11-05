import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { File } from './entities/file.entity';
import * as pdf from 'pdf-parse';
import { Readable } from 'stream';
import * as csvParser from 'csv-parser';
import * as mammoth from 'mammoth';
import * as yaml from 'js-yaml';

import * as XLSX from 'xlsx';
@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private readonly _repository: Repository<File>,
  ) {}

  async findFiles(query: string) {
    const files = await this._repository.find({
      where: {
        title: ILike(`%${query}%`),
        trancription: ILike(`%${query}%`),
      },
    });
    return files;
  }

  async uploadFile(fileData: Express.Multer.File): Promise<any> {
    console.log(fileData.mimetype);
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

    console.log(text);

    const fileEntity = this._repository.create({
      title: fileData.originalname,
      trancription: this.removeAllWhitespace(text),
      originalName: fileData.originalname,
      mimeType: fileData.mimetype,
      size: fileData.size,
      buffer: fileData.buffer,
    });

    const file = await this._repository.save(fileEntity);
    return file;
  }

  removeAllWhitespace(str: string): string {
    return str.replace(/\s+/g, '');
  }

  async extractTextFromDocx(buffer: Buffer): Promise<string> {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value; // The raw text
    return text;
  }

  extractTextFromExcel(buffer: Buffer): string {
    // Read the Excel file from a buffer
    const workbook = XLSX.read(buffer, { type: 'buffer' });

    // Initialize an array to hold all text
    const textArray = [];

    // Loop through each sheet
    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      for (let cell in worksheet) {
        // Ensure the cell is actually a cell and not part of the worksheet's metadata
        if (cell.startsWith('!')) continue;

        // Get the value and add to the array
        const cellValue = worksheet[cell].v;
        textArray.push(cellValue);
      }
    });

    // Join all extracted text with spaces or new lines
    return textArray.join(' ');
  }

  parseCsvToText(buffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const results = [];
      const stream = new Readable();
      stream.push(buffer);
      stream.push(null); // EOF

      stream
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          // Here you can transform your JSON result to a text format as needed
          // For simplicity, we'll just convert it to a string
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
