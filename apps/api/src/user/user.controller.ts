import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { User } from '../app/decorators/auth.decorator';
import { AppService } from '../app/app.service';

@Controller('/api/v1/users')
export class UserController {
  constructor(private readonly appService: AppService) {}

  @User()
  @Get('/')
  @HttpCode(HttpStatus.OK)
  public helloWorld() {
    return this.appService.successTimestamp({
      data: {
        message: 'Hello, world!',
      },
    });
  }
}
