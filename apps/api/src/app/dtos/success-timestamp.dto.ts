import { ApiProperty } from '@nestjs/swagger';
import { Dayjs } from 'dayjs';

export class SuccessTimestampDto {
  @ApiProperty()
  public success: boolean;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
  })
  public timestamp: Dayjs;
}
