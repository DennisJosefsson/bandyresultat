import { z } from 'zod'

export const generalStatsResponse = z.object({
  golds: z.array(
    z.object({ guld: z.number(), team: z.number(), casual_name: z.string() }),
  ),
  finals: z.array(
    z.object({ finals: z.number(), team: z.number(), casual_name: z.string() }),
  ),
  seasons: z.array(
    z.object({
      seasons: z.number(),
      team: z.number(),
      casual_name: z.string(),
    }),
  ),
  allSeasons: z.array(
    z.object({
      seasons: z.number(),
      team: z.number(),
      casual_name: z.string(),
    }),
  ),
  playoffs: z.array(
    z.object({
      playoffs: z.number(),
      team: z.number(),
      casual_name: z.string(),
    }),
  ),
  allPlayoffs: z.array(
    z.object({
      playoffs: z.number(),
      team: z.number(),
      casual_name: z.string(),
    }),
  ),
})

export const streakResponse = z.object({
  losingStreak: z.array(
    z.object({
      team: z.number(),
      name: z.string(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  drawStreak: z.array(
    z.object({
      team: z.number(),
      name: z.string(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  winStreak: z.array(
    z.object({
      team: z.number(),
      name: z.string(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  noWinStreak: z.array(
    z.object({
      team: z.number(),
      name: z.string(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  unbeatenStreak: z.array(
    z.object({
      team: z.number(),
      name: z.string(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  currInoffChamps: z.object({
    count: z.number(),
    rows: z.array(
      z.object({
        team: z.number(),
        lag: z.object({
          name: z.string(),
          casulName: z.string(),
          shortName: z.string(),
        }),
        opponent: z.number(),
        opp: z.object({
          name: z.string(),
          casulName: z.string(),
          shortName: z.string(),
        }),
        date: z.string(),
        goalsScored: z.number(),
        goalsConceded: z.number(),
      }),
    ),
  }),
})

export const pointsGoalsResponse = z.object({
  avgMaxAll: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  avgMaxHome: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  avgMaxAway: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  avgMinAll: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  avgMinHome: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  avgMinAway: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  sumMaxAll: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  sumMaxHome: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  sumMaxAway: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  sumMinAll: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  sumMinHome: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  sumMinAway: z.array(
    z.object({
      team: z.number(),
      lag: z.object({
        name: z.string(),
        casulName: z.string(),
        shortName: z.string(),
      }),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
})

export type GeneralStatsResponse = z.infer<typeof generalStatsResponse>
export type StreakResponse = z.infer<typeof streakResponse>
export type PointsGoalsResponse = z.infer<typeof pointsGoalsResponse>

export type StreakObjectTypes = GeneralStatsResponse &
  StreakResponse &
  PointsGoalsResponse

export type StreakParams = {
  record: string
  women: boolean
}
