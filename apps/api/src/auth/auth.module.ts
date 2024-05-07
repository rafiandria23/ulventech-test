import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppModule } from '../app/app.module';
import { AdminModule } from '../admin/admin.module';
import { UserModule } from '../user/user.module';

import { AdminPassword } from './models/admin-password.model';
import { UserPassword } from './models/user-password.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    SequelizeModule.forFeature([AdminPassword, UserPassword]),
    forwardRef(() => AppModule),
    AdminModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
