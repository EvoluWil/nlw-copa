import { FastifyInstance } from 'fastify';
import { countUser } from './user.service';

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/users/count', async () => {
    return countUser();
  });
};
