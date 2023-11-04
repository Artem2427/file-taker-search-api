import { Global, Module } from '@nestjs/common';
import { OpenAiService } from './services/open-ai.service';
@Global()
@Module({
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class CommonModule {}
