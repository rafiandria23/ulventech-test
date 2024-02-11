import { SetMetadata } from '@nestjs/common';

import { AuthMetadata } from '../constants/auth.constant';

export const Public = () => SetMetadata(AuthMetadata.PUBLIC, true);
export const Admin = () => SetMetadata(AuthMetadata.ADMIN, true);
export const User = () => SetMetadata(AuthMetadata.USER, true);
