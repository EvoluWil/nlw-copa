import { z } from 'zod';

export const signInDto = z.object({
  accessToken: z.string()
});
