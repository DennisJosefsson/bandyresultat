import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Team from '../../models/Team.js'
import Season from '../../models/Season.js'
import TeamGame from '../../models/TeamGame.js'
import { sequelize } from '../../utils/db.js'
import { QueryTypes } from 'sequelize'
import { teamIdChecker } from '../../utils/postFunctions/teamRequest.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import {
  singleTeamTable,
  fiveSeasonsLeagueTable,
  FiveSeasonsLeagueTableType,
} from '../../utils/responseTypes/tableTypes.js'

const singleTeamRouter = Router()

singleTeamRouter.get('/:teamId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamId = teamIdChecker.parse(req.params.teamId)

  res.locals.origin = 'GET Single Team router'
  const team = await Team.findByPk(teamId, {
    include: {
      model: Season,
      attributes: ['year', 'seasonId'],
      through: {
        attributes: ['qualification'],
      },
      as: 'seasonteam',
    },
    order: [[{ model: Season, as: 'seasonteam' }, 'seasonId', 'DESC']],
  })

  if (!team) {
    throw new NotFoundError({
      code: 404,
      message: 'Inget sådant lag finns.',
      logging: false,
      context: { origin: 'GET Single Team Router' },
    })
  }

  const getTables = await TeamGame.findAll({
    where: {
      team: teamId,
      played: true,
    },
    attributes: [
      'category',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'totalGames'],
      [sequelize.fn('sum', sequelize.col('points')), 'totalPoints'],
      [sequelize.fn('sum', sequelize.col('goals_scored')), 'totalGoalsScored'],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'totalGoalsConceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'totalGoalDifference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    group: ['category'],
    order: [
      ['category', 'DESC'],
      ['totalPoints', 'DESC'],
      ['totalGoalDifference', 'DESC'],
      ['totalGoalsScored', 'DESC'],
    ],
    raw: true,
    nest: true,
  })

  const tabeller = singleTeamTable.parse(getTables)

  const finalsAndWins = await TeamGame.findAll({
    where: { team: teamId, category: 'final' },
    order: [['date', 'ASC']],
  })

  const losingStreak = await sequelize.query(
    `with lost_values as (
select 
	team,
	lost, 
	"date",
  women,
	case when lost = true then 1 else 0 end lost_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_lost_values as (
select 
	team,
	lost,
	"date",
  women,
	sum(lost_value) over (partition by team order by date) sum_losts,
	row_number() over (partition by team order by date) round
from lost_values),

grouped_losts as (
select 
	team,
	lost,
	"date",
  women,
	sum_losts,
	round - sum_losts as grouped
from summed_lost_values
where lost = true),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_losts
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const drawStreak = await sequelize.query(
    `with draw_values as (
select 
	team,
	draw, 
	"date",
  women,
	case when draw = true then 1 else 0 end draw_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_draw_values as (
select 
	team,
	draw,
	"date",
  women,
	sum(draw_value) over (partition by team order by date) sum_draws,
	row_number() over (partition by team order by date) round
from draw_values),

grouped_draws as (
select 
	team,
	draw,
	"date",
  women,
	sum_draws,
	round - sum_draws as grouped
from summed_draw_values
where draw = true),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_draws
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const winStreak = await sequelize.query(
    `with win_values as (
select 
	team,
	win, 
	"date",
  women,
	case when win = true then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_win_values as (
select 
	team,
	win,
	"date",
  women,
	sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  women,
	sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = true),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const noWinStreak = await sequelize.query(
    `with win_values as (
select 
	team,
	win, 
	"date",
  women,
	case when win = false then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_win_values as (
select 
	team,
	win,
	"date",
  women,
	sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  women,
	sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = false),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const unbeatenStreak = await sequelize.query(
    `with win_values as (
select 
	team,
	lost, 
	"date",
  women,
	case when lost = false then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and team = $teamId),

summed_win_values as (
select 
	team,
	lost,
	"date",
  women,
	sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	lost,
	"date",
  women,
	sum_wins,
	round - sum_wins as grouped
from summed_win_values
where lost = false),

group_array as (
select
	team,
  women,
	mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team, women)

select
	team,
	"name",
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const playoffStreak = await sequelize.query(
    `with season_order as (select 
dense_rank() over (order by "year") row_num,
season_id,
"year"
from seasons
where season_id >= 25),

playoff_seasons as (
select distinct season_id from teamgames
where team = $teamId and category in ('quarter', 'semi', 'final')
),

selected_rows as (select 
row_num,
row_number() over (order by row_num) row_playoff, 
"year"
from season_order
join playoff_seasons on season_order.season_id = playoff_seasons.season_id),

grouped_playoffs as (select
row_num - row_playoff as grouped,
"year"
from selected_rows),

group_array as (
select
	mode() within group (order by grouped) as max_count, 
	array_agg("year" order by "year") as years
from grouped_playoffs
group by grouped)

select 
array_length(years, 1) as streak_length,
years[1] as start_year,
years[array_upper(years,1)] as end_year 
from group_array
where array_length(years, 1) > 6
order by streak_length desc, start_year asc;`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const playoffCount = await sequelize.query(
    `select count(distinct season_id) as playoff_count
from teamgames
where team = $teamId and "category" = any(array['quarter', 'semi', 'final']) and season_id >= 25;`,
    { bind: { teamId: teamId }, type: QueryTypes.SELECT }
  )

  const latestFiveSeasons = await TeamGame.findAll({
    where: {
      team: req.params.teamId,
      played: true,
    },
    attributes: [
      'seasonId',
      'category',

      [sequelize.literal('count(*)'), 'totalGames'],
      [sequelize.literal('sum (points)'), 'totalPoints'],
      [sequelize.literal('sum(goals_scored)'), 'totalGoalsScored'],
      [sequelize.literal('sum(goals_conceded)'), 'totalGoalsConceded'],
      [sequelize.literal('sum(goal_difference)'), 'totalGoalDifference'],
      [sequelize.literal(`(count(*) filter (where win))`), 'totalWins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'totalDraws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'totalLost'],
    ],
    include: Season,
    group: ['teamgame.season_id', 'category', 'season.season_id'],
    order: [
      ['seasonId', 'DESC'],
      ['category', 'ASC'],
    ],
    limit: 20,
    raw: true,
    nest: true,
  })

  const sortedFiveSeasons = tableSortFunction(
    fiveSeasonsLeagueTable.parse(latestFiveSeasons)
  )

  const womensTeam = team.get().women ? true : false

  const chartData = await sequelize.query(
    `with filtered_seasons as (select * from seasons where women = $womensTeam),
season_data as (select f.season_id as "seasonId", f."year", t.teamseason_id as "teamseasonId", t.qualification, t.neg_qualification as "negQualification",t.promoted,t.relegated,t."position",t.points, t.playoff, t.eight,t.quarter,t.semi ,t."final",t.gold  from filtered_seasons f
full outer join teamseasons t on (t.season_id = f.season_id and t.team_id = $teamId) 
order by f.season_id asc
limit (select count(*) from filtered_seasons))
select * from season_data
where "seasonId" >= (
	select "seasonId" from season_data where "teamseasonId" is not null
	order by "seasonId" asc 
	limit 1
) and "seasonId" <= (
	select "seasonId" from season_data where "teamseasonId" is not null
	order by "seasonId" desc 
	limit 1
);`,
    {
      bind: { teamId: teamId, womensTeam: womensTeam },
      type: QueryTypes.SELECT,
    }
  )

  res.json({
    team,
    tabeller,
    noWinStreak,
    unbeatenStreak,
    winStreak,
    drawStreak,
    losingStreak,
    finalsAndWins,
    playoffStreak,
    playoffCount,
    sortedFiveSeasons,
    chartData,
  })
}) as RequestHandler)

export default singleTeamRouter

type SortedTables = {
  [key: string]: FiveSeasonsLeagueTableType
}

const tableSortFunction = (tableArray: FiveSeasonsLeagueTableType) => {
  const seasonArray = tableArray.reduce((seasons, table) => {
    if (!seasons[table.season.year]) {
      seasons[table.season.year] = []
    }
    seasons[table.season.year].push(table)
    return seasons
  }, {} as SortedTables)

  const sortedTables = Object.keys(seasonArray).map((season) => {
    return {
      season,
      tables: seasonArray[season],
    }
  })
  return sortedTables
    .sort((a, b) => {
      if (a.season > b.season) {
        return 1
      } else if (a.season < b.season) {
        return -1
      } else return 0
    })
    .slice(-5)
}
