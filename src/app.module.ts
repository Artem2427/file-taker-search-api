import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TestModule } from './test/test.module';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  imports: [
    // DevtoolsModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     http: !configService.get('isProduction'),
    //   }),
    // }),
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   // validate: validateEnv,
    //   load: [getConfiguration],
    // }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ({
          type: 'postgres',
          autoLoadEntities: true,
          port: 3306,
          logging: true,
          // entities: ['dist/**/*.entity.ts'],
          url: 'postgres://qlwciyjl:CjHtd1zqw_58V8QrMvJCasNmw5_kAKzf@trumpet.db.elephantsql.com/qlwciyjl',
          // synchronize: true,
        } as TypeOrmModuleOptions),
    }),
    UsersModule,
    TestModule,
    QuestionsModule,
    AnswersModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
