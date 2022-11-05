import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../../lib/prisma';
import { authenticate } from '../../plugins/authenticate.plugin';
import { codeGenerator } from '../../utils/code-generator.util';

export const createPoll = async (title: string, request: FastifyRequest) => {
  const code = codeGenerator(title);

  try {
    await authenticate(request);
    await prisma.poll.create({
      data: {
        title,
        code,
        ownerId: request.user.sub,

        participants: {
          create: {
            userId: request.user.sub
          }
        }
      }
    });
    return { code };
  } catch (error) {
    await prisma.poll.create({
      data: {
        title,
        code
      }
    });
  } finally {
    return { code };
  }
};

export const joinPoll = async (code: string, userId: string) => {
  const poll = await prisma.poll.findUnique({
    where: {
      code
    },
    include: {
      participants: { where: { userId } }
    }
  });

  if (!poll) {
    throw 'Bolão não encontrado';
  }

  if (poll?.participants?.length) {
    throw 'Usuário já participa do bolão';
  }

  if (!poll?.ownerId) {
    await prisma.poll.update({
      where: { id: poll.id },
      data: {
        ownerId: userId
      }
    });
  }

  return prisma.participant.create({
    data: {
      pollId: poll.id,
      userId
    }
  });
};

export const countPoll = async () => {
  const count = await prisma.poll.count();
  return { count };
};

export const listPoll = async (userId: string) => {
  return prisma.poll.findMany({
    where: {
      participants: {
        some: {
          userId
        }
      }
    },
    include: {
      _count: {
        select: { participants: true }
      },
      owner: {
        select: {
          name: true,
          id: true
        }
      },
      participants: {
        select: {
          id: true,
          user: {
            select: {
              pictureUrl: true
            }
          }
        },
        take: 4
      }
    }
  });
};

export const getPoll = async (code: string) => {
  return prisma.poll.findUnique({
    where: {
      code
    },
    include: {
      _count: {
        select: { participants: true }
      },
      owner: {
        select: {
          name: true,
          id: true
        }
      },
      participants: {
        select: {
          id: true,
          user: {
            select: {
              pictureUrl: true
            }
          }
        },
        take: 4
      }
    }
  });
};
