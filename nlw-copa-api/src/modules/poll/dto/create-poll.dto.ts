import { z } from 'zod';

export const createPollDto = z.object({
  title: z.string()
});
