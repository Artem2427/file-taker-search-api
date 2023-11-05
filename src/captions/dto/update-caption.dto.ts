import { PartialType } from '@nestjs/swagger';
import { CreateCaptionDto } from './create-caption.dto';

export class UpdateCaptionDto extends PartialType(CreateCaptionDto) {}
