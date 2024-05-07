import _ from 'lodash';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import {
  AdminAuthRequest,
  UserAuthRequest,
} from '../interfaces/request.interface';
import { AuthMetadata } from '../constants/auth.constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  public async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      AuthMetadata.PUBLIC,
      [ctx.getHandler(), ctx.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const request = ctx
      .switchToHttp()
      .getRequest<UserAuthRequest | AdminAuthRequest>();

    const isAdmin = this.reflector.getAllAndOverride<boolean>(
      AuthMetadata.ADMIN,
      [ctx.getHandler(), ctx.getClass()],
    );
    const isUser = this.reflector.getAllAndOverride<boolean>(
      AuthMetadata.USER,
      [ctx.getHandler(), ctx.getClass()],
    );

    const accessToken = this.extractAccessToken(ctx);

    if (isAdmin) {
      const payload = await this.authenticateAdmin(accessToken);

      _.set(request, 'auth', payload);
    } else if (isUser) {
      const payload = await this.authenticateUser(accessToken);

      _.set(request, 'auth', payload);
    } else {
      throw new UnauthorizedException(
        'Access token is neither for admin nor user!',
      );
    }

    return true;
  }

  private extractAccessToken(ctx: ExecutionContext) {
    const request = ctx
      .switchToHttp()
      .getRequest<UserAuthRequest | AdminAuthRequest>();
    const authorizationHeader = request.headers.authorization;

    if (!authorizationHeader) {
      throw new UnauthorizedException('Authorization header is not found!');
    }

    const [type, accessToken] = authorizationHeader.split(' ');

    if (type !== 'Bearer') {
      throw new UnauthorizedException('Access token type is invalid!');
    } else if (!accessToken) {
      throw new UnauthorizedException('Access token is not found!');
    }

    return accessToken;
  }

  private async authenticateAdmin(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get<string>('jwt.admin_secret'),
      });

      return payload;
    } catch (err) {
      throw new UnauthorizedException('You are not authorized!');
    }
  }

  private async authenticateUser(accessToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(accessToken, {
        secret: this.configService.get<string>('jwt.user_secret'),
      });

      return payload;
    } catch (err) {
      throw new UnauthorizedException('You are not authorized!');
    }
  }
}
