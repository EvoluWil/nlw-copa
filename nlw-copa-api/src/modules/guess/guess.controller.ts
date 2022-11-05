import { FastifyInstance } from 'fastify';
import { authenticate } from '../../plugins/authenticate.plugin';
import {
  createGuessBodyDto,
  createGuessParamsDto
} from './dto/create-guess.dto';
import { countGuess, createGuesses } from './guess.service';

export const guessRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/guesses/count', async () => {
    return countGuess();
  });

  fastify.get(
    '/polls/:pollId/games/gameId/guesses',
    { onRequest: [authenticate] },
    async (req, reply) => {
      const { pollId, gameId } = createGuessParamsDto.parse(req.params);
      const { firstTeamPoints, secondTeamPoints } = createGuessBodyDto.parse(
        req.body
      );

      try {
        await createGuesses(
          pollId,
          gameId,
          firstTeamPoints,
          secondTeamPoints,
          req.user.sub
        );
        return reply.status(201).send();
      } catch (error) {
        return reply.status(400).send({ message: error });
      }
    }
  );
};
