import { z } from 'zod'

export const inputGameObject = z.object({
  gameId: z.number().int().positive().optional(),
  seasonId: z.number(),
  homeTeamId: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .optional(),
  awayTeamId: z
    .object({
      value: z.number(),
      label: z.string(),
    })
    .optional(),
  result: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/)
    .optional(),
  halftimeResult: z
    .string()
    .regex(/^\d{1,2}-\d{1,2}$/)
    .optional(),
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

export const gameObject = z.object({
  gameId: z.number().int().positive().optional(),
  seasonId: z.number(),
  homeTeamId: z.number(),
  awayTeamId: z.number(),
  homeTeam: z
    .object({
      teamId: z.number(),
      name: z.string(),
      casualName: z.string(),
      shortName: z.string(),
    })
    .optional(),
  awayTeam: z
    .object({
      teamId: z.number(),
      name: z.string(),
      casualName: z.string(),
      shortName: z.string(),
    })
    .optional(),
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
  played: z.boolean().default(false).optional(),
})

export type GameObjectType = z.infer<typeof gameObject>
export type InputGameObjectType = z.infer<typeof inputGameObject>
