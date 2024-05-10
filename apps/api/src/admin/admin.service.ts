import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Admin } from './models/admin.model';
import { CreateAdminDto } from './dtos/create.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin) private readonly adminModel: typeof Admin) {}

  public readById(id: string) {
    return this.adminModel.findByPk(id);
  }

  public readByEmail(email: string) {
    return this.adminModel.findOne({
      where: {
        email,
      },
    });
  }

  public async create(payload: CreateAdminDto) {
    try {
      const createdAdmin = await this.adminModel.create({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
      });

      return createdAdmin;
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }
}
