import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

(async () => {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'jhon.doe@email.com',
      pictureUrl: 'https://thispersondoesnotexist.com/image',
      providerId: 'idGoogle'
    }
  });

  const poll = await prisma.poll.create({
    data: {
      title: 'Exemple Poll',
      code: 'exemplepoll',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-15T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'US'
    }
  });

  await prisma.game.create({
    data: {
      date: '2022-11-12T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'FR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 0,

          participant: {
            connect: {
              userId_pollId: {
                pollId: poll.id,
                userId: user.id
              }
            }
          }
        }
      }
    }
  });
})();
