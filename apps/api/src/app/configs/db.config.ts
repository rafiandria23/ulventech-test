import _ from 'lodash';
import { registerAs } from '@nestjs/config';

export default registerAs('db', () => {
  return {
    host: _.defaultTo(process.env.DB_HOST, '127.0.0.1'),
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    name: _.defaultTo(process.env.DB_NAME, 'ulventech'),
  };
});
