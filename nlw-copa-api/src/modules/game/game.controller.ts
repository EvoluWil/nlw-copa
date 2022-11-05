import { FastifyInstance } from 'fastify';
import { authenticate } from '../../plugins/authenticate.plugin';
import { findGameDto } from './dto/find-game.dto';
import { findGames } from './game.service';

export const gameRoutes = async (fastify: FastifyInstance) => {
  fastify.get(
    '/polls/:pollId/games',
    { onRequest: [authenticate] },
    async (req, reply) => {
      const { pollId } = findGameDto.parse(req.params);
      try {
        return findGames(pollId, req.user.sub);
      } catch (error) {
        return reply.status(400).send({ message: error });
      }
    }
  );
};
