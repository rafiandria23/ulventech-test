import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AdminPassword } from './models/admin-password.model';
import { UserPassword } from './models/user-password.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [SequelizeModule.forFeature([AdminPassword, UserPassword])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
