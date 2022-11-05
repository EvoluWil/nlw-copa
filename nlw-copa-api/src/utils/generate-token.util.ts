import { User } from '@prisma/client';
import { FastifyInstance } from 'fastify';

export const generateToken = (fastify: FastifyInstance, user: User) => {
  return fastify.jwt.sign(
    {
      name: user.name
    },
    {
      sub: user.id,
      expiresIn: '7 days'
    }
  );
};
