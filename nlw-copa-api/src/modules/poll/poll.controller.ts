import { FastifyInstance } from 'fastify';
import { authenticate } from '../../plugins/authenticate.plugin';
import { createPollDto } from './dto/create-poll.dto';
import { findPollDto } from './dto/find-poll-dto';
import { joinPollDto } from './dto/join-poll-dto';
import {
  countPoll,
  createPoll,
  getPoll,
  joinPoll,
  listPoll
} from './poll.service';

export const pollRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/polls', async (req, reply) => {
    const { title } = createPollDto.parse(req.body);
    try {
      const code = await createPoll(title, req);
      return reply.status(201).send(code);
    } catch (error) {
      return reply
        .status(400)
        .send({ message: 'Não foi possível criar o bolão', error });
    }
  });

  fastify.post(
    '/polls/:code/join',
    { onRequest: [authenticate] },
    async (req, reply) => {
      const { code } = joinPollDto.parse(req.params);
      try {
        await joinPoll(code, req.user.sub);
        return reply.status(201).send();
      } catch (error) {
        return reply.status(400).send({ message: error });
      }
    }
  );

  fastify.get('/polls/count', () => {
    return countPoll();
  });

  fastify.get('/polls', { onRequest: [authenticate] }, async (req, reply) => {
    try {
      return listPoll(req.user.sub);
    } catch (error) {
      return reply.status(400).send({ message: error });
    }
  });

  fastify.get(
    '/polls/:code',
    { onRequest: [authenticate] },
    async (req, reply) => {
      const { code } = findPollDto.parse(req.params);
      try {
        return getPoll(code);
      } catch (error) {
        return reply.status(400).send({ message: error });
      }
    }
  );
};
