import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { AdminPassword } from './models/admin-password.model';
import { UserPassword } from './models/user-password.model';
import { AdminSignUpDto, UserSignUpDto } from './dtos/sign-up.dto';
import { AdminSignInDto, UserSignInDto } from './dtos/sign-in.dto';
import { AdminService } from '../admin/admin.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AdminPassword)
    private readonly adminPasswordModel: typeof AdminPassword,
    @InjectModel(UserPassword)
    private readonly userPasswordModel: typeof UserPassword,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly adminService: AdminService,
    private readonly userService: UserService,
  ) {}

  private async _signAccessToken(payload: object, secret: string) {
    try {
      const accessToken = await this.jwtService.signAsync(payload, {
        secret,
      });

      return accessToken;
    } catch (err) {
      throw new UnprocessableEntityException(err.message);
    }
  }

  public async adminSignUp(payload: AdminSignUpDto) {
    const existingAdmin = await this.adminService.readByEmail(payload.email);

    if (existingAdmin) {
      throw new UnprocessableEntityException('Admin already exists!');
    }

    const createdAdmin = await this.adminService.create({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
    });

    const [accessToken] = await Promise.all([
      this._signAccessToken(
        { admin_id: createdAdmin.id },
        this.configService.get<string>('jwt.admin_secret'),
      ),
      this.adminPasswordModel.create({
        admin_id: createdAdmin.id,
        password: payload.password,
      }),
    ]);

    return accessToken;
  }

  public async adminSignIn(payload: AdminSignInDto) {
    const existingAdmin = await this.adminService.readByEmail(payload.email);

    if (!existingAdmin) {
      throw new NotFoundException('Admin is not found!');
    }

    const existingAdminPassword = await this.adminPasswordModel.findOne({
      where: {
        admin_id: existingAdmin.id,
      },
    });

    if (!existingAdminPassword) {
      throw new UnprocessableEntityException('Please reset your password!');
    }

    if (
      !(await bcrypt.compare(payload.password, existingAdminPassword.password))
    ) {
      throw new BadRequestException('Wrong email or password!');
    }

    const accessToken = await this._signAccessToken(
      { admin_id: existingAdmin.id },
      this.configService.get<string>('jwt.admin_secret'),
    );

    return accessToken;
  }

  public async userSignUp(payload: UserSignUpDto) {
    const existingUser = await this.userService.readByEmail(payload.email);

    if (existingUser) {
      throw new UnprocessableEntityException('User already exists!');
    }

    const createdUser = await this.userService.create({
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
    });

    const [accessToken] = await Promise.all([
      this._signAccessToken(
        { user_id: createdUser.id },
        this.configService.get<string>('jwt.user_secret'),
      ),
      this.userPasswordModel.create({
        user_id: createdUser.id,
        password: payload.password,
      }),
    ]);

    return accessToken;
  }

  public async userSignIn(payload: UserSignInDto) {
    const existingUser = await this.userService.readByEmail(payload.email);

    if (!existingUser) {
      throw new NotFoundException('User is not found!');
    }

    const existingUserPassword = await this.userPasswordModel.findOne({
      where: {
        user_id: existingUser.id,
      },
    });

    if (!existingUserPassword) {
      throw new UnprocessableEntityException('Please reset your password!');
    }

    if (
      !(await bcrypt.compare(payload.password, existingUserPassword.password))
    ) {
      throw new BadRequestException('Wrong email or password!');
    }

    const accessToken = await this._signAccessToken(
      { user_id: existingUser.id },
      this.configService.get<string>('jwt.user_secret'),
    );

    return accessToken;
  }
}
