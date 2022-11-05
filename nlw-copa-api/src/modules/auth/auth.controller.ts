import { FastifyInstance } from 'fastify';
import { authenticate } from '../../plugins/authenticate.plugin';
import { generateToken } from '../../utils/generate-token.util';
import { getMe, signIn } from './auth.service';
import { signInDto } from './dto/sign-in.dto';

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/me', { onRequest: [authenticate] }, async req => {
    return getMe(req.user.sub);
  });

  fastify.post('/sign-in', async req => {
    const { accessToken } = signInDto.parse(req.body);
    const user = await signIn(accessToken);

    const token = generateToken(fastify, user);

    return { token, user };
  });
};
