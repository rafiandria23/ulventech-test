import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  public successTimestamp({ success = true, data = undefined } = {}) {
    if (data || data === null) {
      return {
        success,
        timestamp: dayjs(),
        data,
      };
    }

    return {
      success,
      timestamp: dayjs(),
    };
  }
}
