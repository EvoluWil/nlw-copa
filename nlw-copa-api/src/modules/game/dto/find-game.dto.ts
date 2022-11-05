import { z } from 'zod';

export const findGameDto = z.object({
  pollId: z.string()
});
