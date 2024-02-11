import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';

import { Public } from '../app/decorators/auth.decorator';
import { AppService } from '../app/app.service';
import { AdminSignUpDto, UserSignUpDto } from './dtos/sign-up.dto';
import { AdminSignInDto, UserSignInDto } from './dtos/sign-in.dto';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('/admins/sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async adminSignUp(@Body() payload: AdminSignUpDto) {
    const accessToken = await this.authService.adminSignUp(payload);

    return this.appService.successTimestamp({
      data: {
        access_token: accessToken,
      },
    });
  }

  @Public()
  @Post('/admins/sign-in')
  @HttpCode(HttpStatus.OK)
  public async adminSignIn(@Body() payload: AdminSignInDto) {
    const accessToken = await this.authService.adminSignIn(payload);

    return this.appService.successTimestamp({
      data: {
        access_token: accessToken,
      },
    });
  }

  @Public()
  @Post('/users/sign-up')
  @HttpCode(HttpStatus.CREATED)
  public async userSignUp(@Body() payload: UserSignUpDto) {
    const accessToken = await this.authService.userSignUp(payload);

    return this.appService.successTimestamp({
      data: {
        access_token: accessToken,
      },
    });
  }

  @Public()
  @Post('/users/sign-in')
  @HttpCode(HttpStatus.OK)
  public async userSignIn(@Body() payload: UserSignInDto) {
    const accessToken = await this.authService.userSignIn(payload);

    return this.appService.successTimestamp({
      data: {
        access_token: accessToken,
      },
    });
  }
}
