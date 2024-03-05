import { z } from 'zod'
import { SingleTeamTable } from '../tables/tables'
import { TeamGameObject } from '../games/games'

export const teamIdFromParams = z.coerce.number().int().positive()
export const compareTeamsSeasonId = z.coerce.number().int().positive()

export const newTeam = z.object({
  name: z.string(),
  shortName: z.string(),
  casualName: z.string(),
  city: z.string(),
  women: z.boolean(),
  lat: z.number(),
  long: z.number(),
})

export const compareFormState = z.object({
  teamArray: z.array(z.number()).max(4).min(2),
  categoryArray: z.array(z.string()),
  startSeason: z.number().nullable(),
  endSeason: z.number().nullable(),
  women: z.boolean(),
})

export const teamAttributes = z.object({
  teamId: z.number(),
  name: z.string(),
  city: z.string(),
  casualName: z.string(),
  shortName: z.string(),
  women: z.boolean().optional(),
  lat: z.number().optional().nullable(),
  long: z.number().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  seasonteam: z.array(
    z.object({
      year: z.string(),
      seasonId: z.number(),
      teamseason: z.object({ qualification: z.boolean().nullable() }),
    }),
  ),
})

export const teamSeasonAttributes = z.object({
  teamseasonId: z.number(),
  seasonId: z.number(),
  teamId: z.number(),
  tableId: z.number().nullable().optional(),
  women: z.boolean(),
  qualification: z.boolean(),
})

export const teamAndSeasonAttributes = z.object({
  teamId: z.number(),
  name: z.string(),
  city: z.string(),
  casualName: z.string(),
  shortName: z.string(),
  women: z.boolean().optional(),
  lat: z.number().optional().nullable(),
  long: z.number().optional().nullable(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  teamseason: z.object({
    teamseasonId: z.number(),
    seasonId: z.number(),
    teamId: z.number(),
    tableId: z.number().nullable().optional(),
    women: z.boolean(),
    qualification: z.boolean(),
  }),
})

type StreakType = {
  team: number
  name: string
  game_count: number
  start_date: string
  end_date: string
  women: boolean
}

export type TeamAttributes = z.infer<typeof teamAttributes>
export type TeamSeasonAttributes = z.infer<typeof teamSeasonAttributes>
export type TeamAndSeasonAttributes = z.infer<typeof teamAndSeasonAttributes>
export type CompareFormState = z.infer<typeof compareFormState>
export type NewTeamType = z.infer<typeof newTeam>
export type SingleTeam = {
  team: TeamAttributes
  tabeller: SingleTeamTable[]
  sortedFiveSeasons: { season: string; tables: SingleTeamTable[] }[]
  finalsAndWins: TeamGameObject[]
  noWinStreak: StreakType[]
  unbeatenStreak: StreakType[]
  winStreak: StreakType[]
  drawStreak: StreakType[]
  losingStreak: StreakType[]
  playoffStreak: {
    streak_length: number
    start_year: string
    end_year: string
  }[]
  playoffCount: { playoff_count: string }[]
}
