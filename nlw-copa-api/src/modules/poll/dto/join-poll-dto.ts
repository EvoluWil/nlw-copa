import { z } from 'zod';

export const joinPollDto = z.object({
  code: z.string().transform(code => code && code.toLowerCase().trim())
});
