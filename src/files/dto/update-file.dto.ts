export enum FileFormat {
  PDF = 'pdf',
  CSV = 'csv',
  EXCEL = 'xlsx',
  DOCX = 'docx',
  YAML = 'yaml',
}

export enum Filter {
  File = 'file',
  Video = 'video',
  All = 'all',
}

export class GetFilesQueryDto {
  search?: string;
  filter?: Filter;
  format?: FileFormat;
}
