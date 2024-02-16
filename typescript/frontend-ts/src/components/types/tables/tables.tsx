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

export const compareCategoryTeamTable = z.object({
  'lag.casualName': z.string(),
  'lag.name': z.string(),
  'lag.shortName': z.string(),
  'lag.teamId': z.number(),
  'opp.casualName': z.string(),
  'opp.name': z.string(),
  'opp.shortName': z.string(),
  'opp.teamId': z.number(),
  category: z.string(),
  team: z.number(),
  opponent: z.number(),
  totalDraws: z.coerce.number(),
  totalGames: z.coerce.number(),
  totalGoalDifference: z.coerce.number(),
  totalGoalsConceded: z.coerce.number(),
  totalGoalsScored: z.coerce.number(),
  totalLost: z.coerce.number(),
  totalPoints: z.coerce.number(),
  totalWins: z.coerce.number(),
})

export type CompareCategoryTeamTable = z.infer<typeof compareCategoryTeamTable>

export const compareAllTeamTables = z.object({
  'lag.casualName': z.string(),
  'lag.name': z.string(),
  'lag.shortName': z.string(),
  'lag.teamId': z.number(),
  'opp.casualName': z.string(),
  'opp.name': z.string(),
  'opp.shortName': z.string(),
  'opp.teamId': z.number(),
  team: z.number(),
  opponent: z.number(),
  totalDraws: z.coerce.number(),
  totalGames: z.coerce.number(),
  totalGoalDifference: z.coerce.number(),
  totalGoalsConceded: z.coerce.number(),
  totalGoalsScored: z.coerce.number(),
  totalLost: z.coerce.number(),
  totalPoints: z.coerce.number(),
  totalWins: z.coerce.number(),
})

export type CompareAllTeamTables = z.infer<typeof compareAllTeamTables>
export const newCompareObject = z.object({
  lag: z.object({
    shortName: z.string(),
    name: z.string(),
    casualName: z.string(),
    teamId: z.number(),
  }),
  team: z.number(),
  totalDraws: z.coerce.number(),
  totalGames: z.coerce.number(),
  totalGoalDifference: z.coerce.number(),
  totalGoalsConceded: z.coerce.number(),
  totalGoalsScored: z.coerce.number(),
  totalLost: z.coerce.number(),
  totalPoints: z.coerce.number(),
  totalWins: z.coerce.number(),
})
export type NewCompareObject = z.infer<typeof newCompareObject>

export const singleTeamTable = z.object({
  category: z.string(),
  totalGames: z.number(),
  totalWins: z.number(),
  totalDraws: z.number(),
  totalLost: z.number(),
  totalGoalsScored: z.number(),
  totalGoalsConceded: z.number(),
  totalGoalDifference: z.number(),
  totalPoints: z.number(),
})

export type SingleTeamTable = z.infer<typeof singleTeamTable>
