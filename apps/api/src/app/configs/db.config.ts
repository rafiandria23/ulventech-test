import _ from 'lodash';
import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  return {
    host: _.defaultTo(process.env.DB_HOST, '127.0.0.1'),
    user: _.defaultTo(process.env.DB_USER, 'ulventech'),
    pass: _.defaultTo(process.env.DB_PASS, 'ulventech'),
    name: _.defaultTo(process.env.DB_NAME, 'ulventech'),
  };
});
