import _ from 'lodash';
import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => {
  return {
    admin_secret: _.defaultTo(process.env.JWT_ADMIN_SECRET, 'ulventech'),
    user_secret: _.defaultTo(process.env.JWT_USER_SECRET, 'ulventech'),
  };
});
