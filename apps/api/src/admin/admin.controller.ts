import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Admin } from '../app/decorators/auth.decorator';
import { AppService } from '../app/app.service';

@Controller('/api/v1/admins')
export class AdminController {
  constructor(private readonly appService: AppService) {}

  @Admin()
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
