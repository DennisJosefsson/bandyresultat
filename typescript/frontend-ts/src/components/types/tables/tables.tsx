import { z } from 'zod'
import { GameObjectType } from '../games/games'

export const tableObject = z.object({
  group: z.string(),
  team: z.number(),
  women: z.boolean(),
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

export const singleSeasonTableObject = tableObject.extend({
  lag: z.object({
    teamId: z.number(),
    name: z.string(),
    shortName: z.string(),
    casualName: z.string(),
  }),
  season: z.object({
    seasonId: z.number(),
    year: z.string(),
  }),
  category: z.string(),
})

export type TableObjectType = z.infer<typeof tableObject>
export type SingleSeasonTableObjectType = z.infer<
  typeof singleSeasonTableObject
>

export type SingleSeasonTableType = {
  playoffGames: GameObjectType[]
  tabell: SingleSeasonTableObjectType[]
  hemmaTabell: SingleSeasonTableObjectType[]
  bortaTabell: SingleSeasonTableObjectType[]
}

export const compareCategoryTeamTable = z.object({
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

export type CompareCategoryTeamTable = z.infer<typeof compareCategoryTeamTable>

export const compareAllTeamTables = z.object({
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

export const parsedCompareAllTeamTables = compareAllTeamTables.omit({
  opp: true,
  opponent: true,
})

export type CompareAllTeamTables = z.infer<typeof compareAllTeamTables>
export type ParsedCompareAllTeamTables = z.infer<
  typeof parsedCompareAllTeamTables
>
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

export const maratonTable = z.array(
  z.object({
    lag: z.object({
      casualName: z.string(),
      name: z.string(),
      shortName: z.string(),
      teamId: z.number(),
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
  }),
)

export type MaratonTabell = z.infer<typeof maratonTable>

export type MaratonTableType = {
  maratonTabell: MaratonTabell
  maratonHemmaTabell: MaratonTabell
  maratonBortaTabell: MaratonTabell
}

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
