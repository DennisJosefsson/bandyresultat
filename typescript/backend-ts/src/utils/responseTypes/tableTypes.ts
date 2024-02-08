import { z } from 'zod'

export const leagueTable = z.array(
  z.object({
    category: z.string(),
    group: z.string(),
    'lag.casualName': z.string(),
    'lag.name': z.string(),
    'lag.shortName': z.string(),
    'lag.teamId': z.number(),
    'season.seasonId': z.number(),
    'season.year': z.string(),
    team: z.number(),
    totalDraws: z.coerce.number(),
    totalGames: z.coerce.number(),
    totalGoalDifference: z.coerce.number(),
    totalGoalsConceded: z.coerce.number(),
    totalGoalsScored: z.coerce.number(),
    totalLost: z.coerce.number(),
    totalPoints: z.coerce.number(),
    totalWins: z.coerce.number(),
    women: z.boolean(),
  })
)

export const maratonTable = z.array(
  z.object({
    'lag.casualName': z.string(),
    'lag.name': z.string(),
    'lag.shortName': z.string(),
    'lag.teamId': z.number(),
    women: z.boolean(),
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
)

export const singleTeamTable = z.array(
  z.object({
    category: z.string(),
    totalDraws: z.coerce.number(),
    totalGames: z.coerce.number(),
    totalGoalDifference: z.coerce.number(),
    totalGoalsConceded: z.coerce.number(),
    totalGoalsScored: z.coerce.number(),
    totalLost: z.coerce.number(),
    totalPoints: z.coerce.number(),
    totalWins: z.coerce.number(),
  })
)

export const compareCategoryTeamTables = z.array(
  z.object({
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
)

export const compareAllTeamTables = z.array(
  z.object({
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
)
