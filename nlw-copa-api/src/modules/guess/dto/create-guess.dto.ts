import { z } from 'zod';

export const createGuessParamsDto = z.object({
  pollId: z.string(),
  gameId: z.string()
});

export const createGuessBodyDto = z.object({
  firstTeamPoints: z.number().min(0),
  secondTeamPoints: z.number().min(0)
});
