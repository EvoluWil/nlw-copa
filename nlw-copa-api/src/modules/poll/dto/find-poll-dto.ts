import { z } from 'zod';

export const findPollDto = z.object({
  code: z.string().transform(code => code && code.toLowerCase().trim())
});
