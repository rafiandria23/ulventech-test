import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { AppModule } from '../app/app.module';

import { Admin } from './models/admin.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [SequelizeModule.forFeature([Admin]), forwardRef(() => AppModule)],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
