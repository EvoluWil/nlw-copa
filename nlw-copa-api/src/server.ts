import Fastify from 'fastify';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';

import { authRoutes } from './modules/auth/auth.controller';
import { gameRoutes } from './modules/game/game.controller';
import { guessRoutes } from './modules/guess/guess.controller';
import { pollRoutes } from './modules/poll/poll.controller';
import { userRoutes } from './modules/user/user.controller';

(async () => {
  const fastify = Fastify({
    logger: true
  });

  await fastify.register(cors, { origin: true });

  await fastify.register(jwt, { secret: `${process.env.JWT_SECRET}` });

  await fastify.register(authRoutes);
  await fastify.register(userRoutes);
  await fastify.register(pollRoutes);
  await fastify.register(guessRoutes);
  await fastify.register(gameRoutes);

  fastify.listen({ port: 3333, host: '0.0.0.0' });
})();
