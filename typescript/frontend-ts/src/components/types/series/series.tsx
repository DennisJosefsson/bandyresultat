import { z } from 'zod'

export const serieAttributes = z.object({
  serieId: z.number().optional().nullable(),
  serieGroupCode: z.string(),
  serieCategory: z.string(),
  serieName: z.string(),
  serieStructure: z.array(z.number()).nullable().optional(),
  seasonId: z.number(),
  bonusPoints: z.string().nullable().optional(),
  comment: z.string().nullable().optional(),
  women: z.boolean().optional(),
})

export type SerieAttributes = z.infer<typeof serieAttributes>
