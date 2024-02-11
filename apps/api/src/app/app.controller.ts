import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Public } from './decorators/auth.decorator';
import { AppService } from './app.service';

@Controller('/api/v1')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
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
