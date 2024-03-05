import { z } from 'zod'
import {
  compareCategoryTeamTable,
  compareAllTeamTables,
  CompareAllTeamTables,
  ParsedCompareAllTeamTables,
  CompareCategoryTeamTable,
} from '../tables/tables'
import { compareLink } from '../link/link'

export const compareResponseObject = z.object({
  tabeller: z.array(compareCategoryTeamTable),
  compareAllGames: z.array(compareAllTeamTables),
  golds: z.array(
    z.object({
      guld: z.string(),
      team: z.number(),
      casual_name: z.string(),
    }),
  ),
  playoffs: z.array(
    z.object({
      playoffs: z.string(),
      team: z.number(),
      casual_name: z.string(),
    }),
  ),
  seasons: z.array(
    z.object({
      seasons: z.string(),
      team: z.number(),
      casual_name: z.string(),
    }),
  ),
  allPlayoffs: z.array(
    z.object({
      playoffs: z.string(),
      team: z.number(),
      casual_name: z.string(),
    }),
  ),
  allSeasons: z.array(
    z.object({
      seasons: z.string(),
      team: z.number(),
      casual_name: z.string(),
    }),
  ),
  firstAndLatestGames: z.array(
    z.object({
      date: z.string(),
      home_name: z.string(),
      away_name: z.string(),
      game_id: z.number(),
      result: z.string(),
      ranked_first_games: z.string(),
      ranked_last_games: z.string(),
    }),
  ),
  link: compareLink,
  seasonNames: z.array(z.object({ seasonId: z.number(), year: z.string() })),
})

type CompareResponseObject = z.infer<typeof compareResponseObject>

type CategoryData = {
  category: string
  teams: CompareCategoryTeamTable[]
}

export type CompareResponseObjectType = {
  allData: CompareAllTeamTables[]
  sortedData: ParsedCompareAllTeamTables[]
  compareAllGames: CompareAllTeamTables[]
  link: CompareResponseObject['link']
  seasonNames: CompareResponseObject['seasonNames']
  firstGames: CompareResponseObject['firstAndLatestGames']
  latestGames: CompareResponseObject['firstAndLatestGames']
  golds: CompareResponseObject['golds']
  playoffs: CompareResponseObject['playoffs']
  seasons: CompareResponseObject['seasons']
  allPlayoffs: CompareResponseObject['allPlayoffs']
  allSeasons: CompareResponseObject['allSeasons']
  categoryData: CategoryData[]
}
