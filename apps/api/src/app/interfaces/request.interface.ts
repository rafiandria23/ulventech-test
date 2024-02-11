import { FastifyRequest } from 'fastify';

export interface UserAuthRequest extends FastifyRequest {
  auth: {
    user_id: string;
  };
}

export interface AdminAuthRequest extends FastifyRequest {
  auth: {
    admin_id: string;
  };
}
