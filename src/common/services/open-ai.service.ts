import { Injectable } from '@nestjs/common';
import { Configuration, OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAIApi;

  async summarize(content: string): Promise<string> {
    try {
      const response = await this.openai.createCompletion({
        model: 'text-davinci-003', // Or another suitable model
        prompt: `Provide a short summary for the following content:\n\n${content}`,
        max_tokens: 150,
      });

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error summarizing content with OpenAI:', error);
      throw new Error('Failed to summarize content with OpenAI');
    }
  }
}
