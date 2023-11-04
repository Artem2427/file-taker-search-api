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
import { CommonModule } from './common/common.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'postgres',
          autoLoadEntities: true,
          port: 3306,
          logging: true,
          url: 'postgres://qlwciyjl:CjHtd1zqw_58V8QrMvJCasNmw5_kAKzf@trumpet.db.elephantsql.com/qlwciyjl',
          synchronize: true,
        } as TypeOrmModuleOptions),
    }),
    UsersModule,
    TestModule,
    QuestionsModule,
    AnswersModule,
    SubjectsModule,
    TopicModule,
    StepsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
