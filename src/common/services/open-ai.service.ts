import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI = new OpenAI({
    apiKey: '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', // Your OpenAI API Key should be secured in environment variables
  });

  async search(query: string): Promise<string> {
    try {
      // Using the OpenAI API to process the natural language query
      const response = await this.openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Or another suitable model depending on your needs and availability
        messages: [
          {
            role: 'user',
            content: `Rewrite the following search query to be more formal and precise for a database search: "${query}"`,
          },
        ],
      });

      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error processing search query with OpenAI:', error);
      throw new Error('Failed to process search query with OpenAI');
    }
  }

  async summarize(content: string): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        messages: [
          {
            role: 'system',
            content:
              'Provide a short summary for the following content::\n\n${content}',
          },
        ],
        model: 'gpt-3.5-turbo',
        max_tokens: 150,
      });

      return completion.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error summarizing content with OpenAI:', error);
      throw new Error('Failed to summarize content with OpenAI');
    }
  }
}