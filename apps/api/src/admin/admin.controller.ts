import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import dayjs from 'dayjs';

import { SuccessTimestampDto } from '../app/dtos/success-timestamp.dto';
import { Admin } from '../app/decorators/auth.decorator';
import { AppService } from '../app/app.service';

@ApiExtraModels(SuccessTimestampDto)
@ApiBearerAuth('Admin')
@Controller('/api/v1/admins')
export class AdminController {
  constructor(private readonly appService: AppService) {}

  @ApiTags('Admin')
  @ApiHeader({
    name: 'Authorization',
    required: true,
    description: 'Admin JWT access token.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success.',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(SuccessTimestampDto),
        },
        {
          properties: {
            data: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
              },
              required: ['message'],
            },
          },
          required: ['data'],
          example: {
            success: true,
            timestamp: dayjs(),
            data: {
              message: 'Hello, world!',
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized.',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(SuccessTimestampDto),
        },
        {
          properties: {
            data: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                },
              },
              required: ['message'],
            },
          },
          required: ['data'],
          example: {
            success: false,
            timestamp: dayjs(),
            data: {
              message: 'You are not authorized!',
            },
          },
        },
      ],
    },
  })
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
