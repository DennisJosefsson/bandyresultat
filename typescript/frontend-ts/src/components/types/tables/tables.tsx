import { z } from 'zod'

export const tableObject = z.object({
  group: z.string(),
  team: z.number(),
  lag: z.object({
    shortName: z.string(),
    name: z.string(),
  }),
  totalGames: z.number(),
  totalWins: z.number(),
  totalDraws: z.number(),
  totalLost: z.number(),
  totalGoalsScored: z.number(),
  totalGoalsConceded: z.number(),
  totalGoalDifference: z.number(),
  totalPoints: z.number(),
})

export type TableObjectType = z.infer<typeof tableObject>
