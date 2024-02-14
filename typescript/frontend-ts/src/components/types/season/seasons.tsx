import { z } from 'zod'
import { serieAttributes } from '../series/series'
import { teamAndSeasonAttributes } from '../teams/teams'

const seasonObject = z.object({
  seasonId: z.number(),
  year: z.string(),
  women: z.boolean(),
  series: z.array(serieAttributes),
  teams: z.array(teamAndSeasonAttributes),
})

export type SeasonObjectType = z.infer<typeof seasonObject>
