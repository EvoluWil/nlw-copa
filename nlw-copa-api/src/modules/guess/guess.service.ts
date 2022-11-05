import { prisma } from '../../lib/prisma';

export const countGuess = async () => {
  const count = await prisma.poll.count();
  return { count };
};

export const createGuesses = async (
  pollId: string,
  gameId: string,
  firstTeamPoints: number,
  secondTeamPoints: number,
  userId: string
) => {
  const participant = await prisma.participant.findUnique({
    where: {
      userId_pollId: {
        pollId,
        userId
      }
    }
  });

  if (!participant) {
    throw 'Usuário não participa deste bolão';
  }

  const guess = await prisma.guess.findUnique({
    where: {
      gameId_participantId: {
        gameId,
        participantId: participant.id
      }
    }
  });

  if (guess) {
    throw 'Usuário já palpitou nesse jogo';
  }

  const game = await prisma.game.findUnique({
    where: {
      id: gameId
    }
  });

  if (!game) {
    throw 'Jogo não encontrado';
  }

  if (new Date(game.date) < new Date()) {
    throw 'Você não pode palpitar depois do jogo';
  }

  return prisma.guess.create({
    data: {
      firstTeamPoints,
      secondTeamPoints,
      gameId,
      participantId: participant.id
    }
  });
};
