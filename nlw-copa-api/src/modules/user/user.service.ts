import { prisma } from '../../lib/prisma';

export const countUser = async () => {
  const count = await prisma.poll.count();
  return { count };
};
