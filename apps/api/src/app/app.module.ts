import path from 'path';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import apiConfig from './configs/api.config';
import dbConfig from './configs/db.config';
import { ExceptionFilter } from './filters/exception.filter';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [apiConfig, dbConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        return {
          dialect: 'sqlite',
          host: configService.get<string>('db.host'),
          user: configService.get<string>('db.user'),
          pass: configService.get<string>('db.pass'),
          storage: path.join(
            __dirname,
            '..',
            '..',
            'db',
            `${configService.get<string>('db.name')}.sqlite`,
          ),
        };
      },
    }),
    AuthModule,
    AdminModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory() {
        return new ValidationPipe({
          exceptionFactory(data) {
            return new BadRequestException(data);
          },
          validationError: {
            target: false,
            value: false,
          },
        });
      },
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
  ],
})
export class AppModule {}
