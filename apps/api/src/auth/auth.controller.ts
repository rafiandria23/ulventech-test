import { Controller, Post, HttpCode, HttpStatus, Body } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiTags,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { SuccessTimestampDto } from '../app/dtos/success-timestamp.dto';
import { Public } from '../app/decorators/auth.decorator';
import { AppService } from '../app/app.service';
import { AdminSignUpDto, UserSignUpDto } from './dtos/sign-up.dto';
import { AdminSignInDto, UserSignInDto } from './dtos/sign-in.dto';
import { AuthService } from './auth.service';

@ApiExtraModels(SuccessTimestampDto)
@Controller('/api/v1/auth')
export class AuthController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @ApiTags('Auth')
  @ApiResponse({
    description: 'Success.',
    status: HttpStatus.CREATED,
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
                access_token: {
                  type: 'string',
                  format: 'jwt',
                },
              },
              required: ['access_token'],
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error.',
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
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Admin already exists.',
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
        },
      ],
    },
  })
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

  @ApiTags('Auth')
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
                access_token: {
                  type: 'string',
                  format: 'jwt',
                },
              },
              required: ['access_token'],
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error.',
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
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Admin is not found.',
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
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Requires password reset.',
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
        },
      ],
    },
  })
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

  @ApiTags('Auth')
  @ApiResponse({
    status: HttpStatus.CREATED,
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
                access_token: {
                  type: 'string',
                  format: 'jwt',
                },
              },
              required: ['access_token'],
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error.',
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
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'User already exists.',
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
        },
      ],
    },
  })
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

  @ApiTags('Auth')
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
                access_token: {
                  type: 'string',
                  format: 'jwt',
                },
              },
              required: ['access_token'],
            },
          },
          required: ['data'],
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation error.',
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
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User is not found.',
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
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: 'Requires password reset.',
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
        },
      ],
    },
  })
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
