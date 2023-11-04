import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TestModule } from './test/test.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { SubjectsModule } from './subjects/subjects.module';
import { TopicModule } from './topic/topic.module';
import { StepsModule } from './steps/steps.module';

@Module({
  imports: [UsersModule, TestModule, QuestionsModule, AnswersModule, SubjectsModule, TopicModule, StepsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
