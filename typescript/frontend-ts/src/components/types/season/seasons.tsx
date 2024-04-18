import { z } from 'zod'
import { serieAttributes } from '../series/series'
import { teamAndSeasonAttributes } from '../teams/teams'
import { staticSeasonTable } from '../tables/tables'

const postNewSeasonType = z.object({
  seasonId: z.number(),
  year: z.string(),
  women: z.boolean(),
  serieStructure: z.boolean().optional().nullable(),
})

const seasonObject = z.object({
  seasonId: z.number(),
  year: z.string(),
  women: z.boolean(),
  series: z.array(serieAttributes),
  teams: z.array(teamAndSeasonAttributes),
  tables: z.array(staticSeasonTable),
})

export type SeasonObjectType = z.infer<typeof seasonObject>
export type PostNewSeasonType = z.infer<typeof postNewSeasonType>
