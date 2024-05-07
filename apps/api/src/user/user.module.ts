import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppModule } from '../app/app.module';

import { User } from './models/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AppModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
