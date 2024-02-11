import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { User } from './models/user.model';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  readById(id: string) {
    return this.userModel.findByPk(id);
  }

  readByEmail(email: string) {
    return this.userModel.findOne({
      where: {
        email,
      },
    });
  }

  async create(payload: CreateUserDto) {
    try {
      const createdUser = await this.userModel.create({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
      });

      return createdUser;
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }
}
