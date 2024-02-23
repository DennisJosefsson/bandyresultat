import { z } from 'zod'

export const statsObject = z.object({
  gamesCountTotal: z.array(
    z.object({
      women: z.boolean(),
      year: z.string(),
      season_id: z.number(),
      count: z.number(),
    }),
  ),
  gamesCountTotalCat: z.array(
    z.object({
      women: z.boolean(),
      year: z.string(),
      season_id: z.number(),
      count: z.number(),
      category: z.string(),
    }),
  ),
  winCountHomeTeam: z.array(
    z.object({
      women: z.boolean(),
      year: z.string(),
      season_id: z.number(),
      count: z.number(),
    }),
  ),
  winCountAwayTeam: z.array(
    z.object({
      women: z.boolean(),
      year: z.string(),
      season_id: z.number(),
      count: z.number(),
    }),
  ),
  drawCount: z.array(
    z.object({
      women: z.boolean(),
      year: z.string(),
      season_id: z.number(),
      count: z.number(),
    }),
  ),
  winCountHomeTeamCat: z.array(
    z.object({
      women: z.boolean(),
      year: z.string(),
      season_id: z.number(),
      count: z.number(),
      category: z.string(),
    }),
  ),
  winCountAwayTeamCat: z.array(
    z.object({
      women: z.boolean(),
      year: z.string(),
      season_id: z.number(),
      count: z.number(),
      category: z.string(),
    }),
  ),
  drawCountCat: z.array(
    z.object({
      women: z.boolean(),
      year: z.string(),
      season_id: z.number(),
      count: z.number(),
      category: z.string(),
    }),
  ),
  goalsScoredTotal: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredTotalCat: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      category: z.string(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredAverage: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredAverageCat: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      category: z.string(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredHomeTotal: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredAwayTotal: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredHomeTotalCat: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      category: z.string(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredAwayTotalCat: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      category: z.string(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredHomeAverage: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredAwayAverage: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredHomeAverageCat: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      category: z.string(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  goalsScoredAwayAverageCat: z.array(
    z.object({
      women: z.boolean(),
      data: z.number(),
      category: z.string(),
      season: z.object({
        seasonId: z.number(),
        year: z.string(),
      }),
    }),
  ),
  unbeatenStreak: z.array(
    z.object({
      team: z.number(),
      casual_name: z.string(),
      women: z.boolean(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  winStreak: z.array(
    z.object({
      team: z.number(),
      casual_name: z.string(),
      women: z.boolean(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  drawStreak: z.array(
    z.object({
      team: z.number(),
      casual_name: z.string(),
      women: z.boolean(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  noWinStreak: z.array(
    z.object({
      team: z.number(),
      casual_name: z.string(),
      women: z.boolean(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  losingStreak: z.array(
    z.object({
      team: z.number(),
      casual_name: z.string(),
      women: z.boolean(),
      game_count: z.number(),
      start_date: z.string(),
      end_date: z.string(),
    }),
  ),
  maxGoalsMen: z.array(
    z.object({
      home_name: z.string(),
      away_name: z.string(),
      resultat: z.string(),
      datum: z.string(),
      sum_goals: z.number(),
    }),
  ),
  maxGoalsWomen: z.array(
    z.object({
      home_name: z.string(),
      away_name: z.string(),
      resultat: z.string(),
      datum: z.string(),
      sum_goals: z.number(),
    }),
  ),
  minGoalsMen: z.array(
    z.object({
      home_name: z.string(),
      away_name: z.string(),
      resultat: z.string(),
      datum: z.string(),
      sum_goals: z.number(),
    }),
  ),
  minGoalsWomen: z.array(
    z.object({
      home_name: z.string(),
      away_name: z.string(),
      resultat: z.string(),
      datum: z.string(),
      sum_goals: z.number(),
    }),
  ),
  maxDiffMen: z.array(
    z.object({
      home_name: z.string(),
      away_name: z.string(),
      resultat: z.string(),
      datum: z.string(),
      goal_difference: z.number(),
    }),
  ),
  maxDiffWomen: z.array(
    z.object({
      home_name: z.string(),
      away_name: z.string(),
      resultat: z.string(),
      datum: z.string(),
      goal_difference: z.number(),
    }),
  ),
})

export type SeasonStatsObjectType = z.infer<typeof statsObject>
