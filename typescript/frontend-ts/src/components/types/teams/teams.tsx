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

export const compareFormState = z
  .object({
    teamArray: z
      .array(z.number())
      .max(4, { message: 'Max max 4 lag' })
      .min(2, { message: 'Välj minst 2 lag' }),
    categoryArray: z
      .array(z.string())
      .min(1, { message: 'Välj minst en matchkategori' }),
    startSeason: z.string(),
    endSeason: z.string(),
    women: z.boolean(),
  })
  .refine((arg) => Number(arg.startSeason) <= Number(arg.endSeason), {
    message: 'Första säsong kan inte komma efter sista säsong.',
    path: ['startSeason'],
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
  teamseasonId: z.number().optional(),
  seasonId: z.number(),
  teamId: z.number(),
  tableId: z.number().nullable().optional(),
  women: z.boolean(),
  qualification: z.boolean(),
  negQualification: z.boolean().optional(),
  promoted: z.boolean().optional(),
  relegated: z.boolean().optional(),
  position: z.number().optional().nullable(),
  points: z.number().optional().nullable(),
  playoff: z.boolean().optional(),
  eight: z.boolean().optional(),
  quarter: z.boolean().optional(),
  semi: z.boolean().optional(),
  final: z.boolean().optional(),
  gold: z.boolean().optional(),
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
  teamseason: teamSeasonAttributes,
})

export const streakType = z.object({
  team: z.number(),
  name: z.string(),
  game_count: z.number(),
  start_date: z.string(),
  end_date: z.string(),
  women: z.boolean(),
})

export type StreakType = z.infer<typeof streakType>

export const teamChartType = z.object({
  seasonId: z.number(),
  year: z.string(),
  teamseasonId: z.number(),
  qualification: z.boolean().nullable(),
  negQualification: z.boolean().nullable(),
  promoted: z.boolean().nullable(),
  relegated: z.boolean().nullable(),
  position: z.number().nullable(),
  points: z.number().nullable(),
  playoff: z.boolean().nullable(),
  eight: z.boolean().nullable(),
  quarter: z.boolean().nullable(),
  semi: z.boolean().nullable(),
  final: z.boolean().nullable(),
  gold: z.boolean().nullable(),
})

export type TeamChartType = z.infer<typeof teamChartType>

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
  chartData: TeamChartType[]
}
