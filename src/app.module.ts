import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesModule } from './files/files.module';
import { VideoModule } from './video/video.module';

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
    CommonModule,
    FilesModule,
    VideoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
