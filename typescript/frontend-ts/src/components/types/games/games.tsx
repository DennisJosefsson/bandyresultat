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
  homeTeam: z.object({
    teamId: z.number(),
    name: z.string(),
    casualName: z.string(),
    shortName: z.string(),
  }),
  awayTeam: z.object({
    teamId: z.number(),
    name: z.string(),
    casualName: z.string(),
    shortName: z.string(),
  }),
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

export const gameFormObject = z.object({
  gameId: z.number().int().positive().optional(),
  seasonId: z.number(),
  homeTeamId: z.number(),
  awayTeamId: z.number(),
  result: z.string().optional(),
  halftimeResult: z.string().optional(),
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

export const teamGameObject = z.object({
  gameId: z.number(),
  teamGameId: z.number(),
  team: z.number(),
  opponent: z.number(),
  date: z.string(),
  scoredGoals: z.number(),
  concededGoals: z.number(),
  goalDifference: z.number(),
  totalGoals: z.number(),
  points: z.number(),
  win: z.boolean(),
  lost: z.boolean(),
  draw: z.boolean(),
  category: z.string(),
  group: z.string(),
  played: z.boolean(),
  homeGame: z.boolean(),
})

export const searchResultTeamgameObject = z.object({
  gameId: z.number(),
  teamGameId: z.number(),
  team: z.number(),
  opponent: z.number(),
  date: z.string(),
  scoredGoals: z.number(),
  concededGoals: z.number(),
  goalDifference: z.number(),
  totalGoals: z.number(),
  points: z.number(),
  win: z.boolean(),
  lost: z.boolean(),
  draw: z.boolean(),
  category: z.string(),
  group: z.string(),
  played: z.boolean(),
  homeGame: z.boolean(),
  qualificationGame: z.boolean(),
  lag: z.object({
    teamId: z.number(),
    name: z.string(),
    casualName: z.string(),
    shortName: z.string(),
  }),
  opp: z.object({
    teamId: z.number(),
    name: z.string(),
    casualName: z.string(),
    shortName: z.string(),
  }),
  game: z.object({ result: z.string() }),
})

export type GameObjectType = z.infer<typeof gameObject>
export type GameFormObjectType = z.infer<typeof gameFormObject>
export type InputGameObjectType = z.infer<typeof inputGameObject>
export type TeamGameObject = z.infer<typeof teamGameObject>
export type SearchResultTeamGameObject = z.infer<
  typeof searchResultTeamgameObject
>
