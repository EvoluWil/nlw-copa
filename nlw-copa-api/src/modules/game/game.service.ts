import { prisma } from '../../lib/prisma';

export const findGames = async (pollId: string, userId: string) => {
  const games = await prisma.game.findMany({
    orderBy: {
      date: 'desc'
    },
    include: {
      guesses: {
        where: {
          participant: {
            pollId,
            userId
          }
        }
      }
    }
  });

  return games.map(game => ({
    ...game,
    guess: game.guesses.length ? game.guesses[0] : null,
    guesses: undefined
  }));
};
