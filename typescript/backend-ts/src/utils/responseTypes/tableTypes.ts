import { z } from 'zod'

export const miniTableItem = z.object({
  team: z.number(),
  women: z.boolean(),
  category: z.string(),
  group: z.string(),
  lag: z.object({
    casualName: z.string(),
    name: z.string(),
    shortName: z.string(),
    teamId: z.number(),
  }),
  season: z.object({
    seasonId: z.number(),
    year: z.string(),
  }),
})

const tableItem = z.object({
  category: z.string(),
  group: z.string(),
  lag: z.object({
    casualName: z.string(),
    name: z.string(),
    shortName: z.string(),
    teamId: z.number(),
  }),
  season: z.object({
    seasonId: z.number(),
    year: z.string(),
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
  women: z.boolean(),
})

export const leagueTable = z.array(tableItem)
export const miniTableItemArray = z.array(miniTableItem)
export type TableItem = z.infer<typeof tableItem>
export type MiniTableItemArray = z.infer<typeof miniTableItemArray>
export type LeagueTableType = z.infer<typeof leagueTable>

export const fiveSeasonsLeagueTable = z.array(
  z.object({
    category: z.string(),
    season: z.object({
      seasonId: z.number(),
      year: z.string(),
    }),

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

export type FiveSeasonsLeagueTableType = z.infer<typeof fiveSeasonsLeagueTable>

export const maratonTable = z.array(
  z.object({
    lag: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
      women: z.boolean(),
    }),

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
    lag: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
    }),
    opp: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
    }),
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
    lag: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
    }),
    opp: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
    }),
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
