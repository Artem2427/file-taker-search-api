import { Global, Module } from '@nestjs/common';
import { OpenAiService } from './services/open-ai.service';
import { HttpModule } from '@nestjs/axios';
@Global()
@Module({
  imports: [HttpModule],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class CommonModule {}
