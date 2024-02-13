import { z } from 'zod'

export const gameObject = z.object({
  gameId: z.number().int().positive().optional(),
  seasonId: z.number(),
  homeTeamId: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .optional()
    .transform((val) => (val === undefined ? undefined : val.value)),
  awayTeamId: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .optional()
    .transform((val) => (val === undefined ? undefined : val.value)),
  result: z.string().optional(),
  halftimeResult: z.string().optional(),
  homeGoal: z.number().optional(),
  awayGoal: z.number().optional(),
  halftimeHomeGoal: z.number().optional(),
  halftimeAwayGoal: z.number().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-{2}$/),
  category: z
    .enum(['qualification', 'regular', 'eight', 'quarter', 'semi', 'final'])
    .default('regular'),
  group: z.string().default('Elitserien'),
  playoff: z.boolean().default(false),
  extraTime: z.boolean().default(false),
  penalties: z.boolean().default(false),
  women: z.boolean().default(false),
})

export type GameObjectType = z.infer<typeof gameObject>
