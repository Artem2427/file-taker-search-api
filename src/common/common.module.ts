import { Global, Module } from '@nestjs/common';
import { CommonController } from './common.controller';
import { OpenAiService } from './services/open-ai.service';
@Global()
@Module({
  controllers: [CommonController],
  providers: [OpenAiService],
})
export class CommonModule {}
