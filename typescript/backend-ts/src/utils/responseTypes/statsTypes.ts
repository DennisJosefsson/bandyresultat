import { z } from 'zod'

export const goalStatsObject = z.array(
  z.object({
    women: z.boolean(),
    data: z.coerce.number(),
    season: z.object({
      seasonId: z.number(),
      year: z.string(),
    }),
  })
)

export const goalStatsByCatObject = z.array(
  z.object({
    women: z.boolean(),
    category: z.string(),
    data: z.coerce.number(),
    season: z.object({
      seasonId: z.number(),
      year: z.string(),
    }),
  })
)
