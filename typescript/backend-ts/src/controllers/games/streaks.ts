import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import { sequelize } from '../../utils/db.js'
import { QueryTypes, Op } from 'sequelize'
import TeamGame from '../../models/TeamGame.js'
import Team from '../../models/Team.js'
import Season from '../../models/Season.js'
import { streakRequest } from '../../utils/postFunctions/gameRequest.js'

const streakRouter = Router()

streakRouter.post('/streaks', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST streaks router'
  const streakObject = streakRequest.parse(req.body)

  if (streakObject.record === 'streaks' && streakObject.women === true) {
    const currInoffChamps = await TeamGame.findAndCountAll({
      where: { currInoffChamp: true, women: true },
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'opp',
        },
      ],
      order: [['date', 'desc']],
      limit: 10,
    })

    const womenLosingStreak = await sequelize.query(
      `with lost_values as (
select 
	team,
	lost, 
	"date",
  case when lost = true then 1 else 0 end lost_value
from teamgames
where category != 'qualification' and played = true and women = true),

summed_lost_values as (
select 
	team,
	lost,
	"date",
  sum(lost_value) over (partition by team order by date) sum_losts,
	row_number() over (partition by team order by date) round
from lost_values),

grouped_losts as (
select 
	team,
	lost,
	"date",
  sum_losts,
	round - sum_losts as grouped
from summed_lost_values
where lost = true),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_losts
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )

    const womenDrawStreak = await sequelize.query(
      `with draw_values as (
select 
	team,
	draw, 
	"date",
  case when draw = true then 1 else 0 end draw_value
from teamgames
where category != 'qualification' and played = true and women = true),

summed_draw_values as (
select 
	team,
	draw,
	"date",
  sum(draw_value) over (partition by team order by date) sum_draws,
	row_number() over (partition by team order by date) round
from draw_values),

grouped_draws as (
select 
	team,
	draw,
	"date",
  sum_draws,
	round - sum_draws as grouped
from summed_draw_values
where draw = true),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_draws
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )

    const womenWinStreak = await sequelize.query(
      `with win_values as (
select 
	team,
	win, 
	"date",
  case when win = true then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and women = true),

summed_win_values as (
select 
	team,
	win,
	"date",
  sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = true),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )

    const womenNoWinStreak = await sequelize.query(
      `with win_values as (
select 
	team,
	win, 
	"date",
  case when win = false then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and women = true),

summed_win_values as (
select 
	team,
	win,
	"date",
  sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = false),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )

    const womenUnbeatenStreak = await sequelize.query(
      `with win_values as (
select 
	team,
	lost, 
	"date",
  case when lost = false then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and women = true),

summed_win_values as (
select 
	team,
	lost,
	"date",
  sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	lost,
	"date",
  sum_wins,
	round - sum_wins as grouped
from summed_win_values
where lost = false),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )

    return res.status(200).json({
      losingStreak: womenLosingStreak,
      drawStreak: womenDrawStreak,
      winStreak: womenWinStreak,
      noWinStreak: womenNoWinStreak,
      unbeatenStreak: womenUnbeatenStreak,
      currInoffChamps: currInoffChamps,
    })
  } else if (
    streakObject.record === 'streaks' &&
    streakObject.women === false
  ) {
    const currInoffChamps = await TeamGame.findAndCountAll({
      where: { currInoffChamp: true, women: false },
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'opp',
        },
      ],
      order: [['date', 'desc']],
      limit: 10,
    })

    const menLosingStreak = await sequelize.query(
      `with lost_values as (
select 
	team,
	lost, 
	"date",
  case when lost = true then 1 else 0 end lost_value
from teamgames
where category != 'qualification' and played = true and women = false),

summed_lost_values as (
select 
	team,
	lost,
	"date",
  sum(lost_value) over (partition by team order by date) sum_losts,
	row_number() over (partition by team order by date) round
from lost_values),

grouped_losts as (
select 
	team,
	lost,
	"date",
  sum_losts,
	round - sum_losts as grouped
from summed_lost_values
where lost = true),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_losts
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )

    const menDrawStreak = await sequelize.query(
      `with draw_values as (
select 
	team,
	draw, 
	"date",
  case when draw = true then 1 else 0 end draw_value
from teamgames
where category != 'qualification' and played = true and women = false),

summed_draw_values as (
select 
	team,
	draw,
	"date",
  sum(draw_value) over (partition by team order by date) sum_draws,
	row_number() over (partition by team order by date) round
from draw_values),

grouped_draws as (
select 
	team,
	draw,
	"date",
  sum_draws,
	round - sum_draws as grouped
from summed_draw_values
where draw = true),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_draws
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )

    const menWinStreak = await sequelize.query(
      `with win_values as (
select 
	team,
	win, 
	"date",
  case when win = true then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and women = false),

summed_win_values as (
select 
	team,
	win,
	"date",
  sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = true),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )

    const menNoWinStreak = await sequelize.query(
      `with win_values as (
select 
	team,
	win, 
	"date",
  case when win = false then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and women = false),

summed_win_values as (
select 
	team,
	win,
	"date",
  sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	win,
	"date",
  sum_wins,
	round - sum_wins as grouped
from summed_win_values
where win = false),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )

    const menUnbeatenStreak = await sequelize.query(
      `with win_values as (
select 
	team,
	lost, 
	"date",
  case when lost = false then 1 else 0 end win_value
from teamgames
where category != 'qualification' and played = true and women = false),

summed_win_values as (
select 
	team,
	lost,
	"date",
  sum(win_value) over (partition by team order by date) sum_wins,
	row_number() over (partition by team order by date) round
from win_values),

grouped_wins as (
select 
	team,
	lost,
	"date",
  sum_wins,
	round - sum_wins as grouped
from summed_win_values
where lost = false),

group_array as (
select
	team,
  mode() within group (order by grouped) as max_count, 
	array_agg(date order by date) as dates
from grouped_wins
group by grouped, team)

select
	team,
	"name",
  array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
order by game_count desc
limit 10;
`,
      { type: QueryTypes.SELECT }
    )
    return res.status(200).json({
      losingStreak: menLosingStreak,
      drawStreak: menDrawStreak,
      winStreak: menWinStreak,
      noWinStreak: menNoWinStreak,
      unbeatenStreak: menUnbeatenStreak,
      currInoffChamps: currInoffChamps,
    })
  } else if (streakObject.record === 'points' && streakObject.women === true) {
    const averagePointsWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const averagePointsHomeWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const averagePointsAwayWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const averagePointsWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const averagePointsHomeWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const averagePointsAwayWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const sumPointsWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const sumPointsHomeWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const sumPointsAwayWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const sumPointsWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 12`),
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const sumPointsHomeWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 6`),
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const sumPointsAwayWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 6`),
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    return res.status(200).json({
      avgMaxAll: averagePointsWomenMax,
      avgMaxHome: averagePointsHomeWomenMax,
      avgMaxAway: averagePointsAwayWomenMax,
      avgMinAll: averagePointsWomenMin,
      avgMinHome: averagePointsHomeWomenMin,
      avgMinAway: averagePointsAwayWomenMin,
      sumMaxAll: sumPointsWomenMax,
      sumMaxHome: sumPointsHomeWomenMax,
      sumMaxAway: sumPointsAwayWomenMax,
      sumMinAll: sumPointsWomenMin,
      sumMinHome: sumPointsHomeWomenMin,
      sumMinAway: sumPointsAwayWomenMin,
    })
  } else if (streakObject.record === 'points' && streakObject.women === false) {
    const averagePointsMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const averagePointsHomeMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const averagePointsAwayMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const averagePointsMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const averagePointsHomeMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const averagePointsAwayMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('points')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const sumPointsMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const sumPointsHomeMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const sumPointsAwayMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'desc']],
      limit: 10,
    })

    const sumPointsMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 24`),
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const sumPointsHomeMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 12`),
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    const sumPointsAwayMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [[sequelize.fn('SUM', sequelize.col('points')), 'data']],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 12`),
      order: [[sequelize.fn('SUM', sequelize.col('points')), 'asc']],
      limit: 10,
    })

    return res.status(200).json({
      avgMaxAll: averagePointsMenMax,
      avgMaxHome: averagePointsHomeMenMax,
      avgMaxAway: averagePointsAwayMenMax,
      avgMinAll: averagePointsMenMin,
      avgMinHome: averagePointsHomeMenMin,
      avgMinAway: averagePointsAwayMenMin,
      sumMaxAll: sumPointsMenMax,
      sumMaxHome: sumPointsHomeMenMax,
      sumMaxAway: sumPointsAwayMenMax,
      sumMinAll: sumPointsMenMin,
      sumMinHome: sumPointsHomeMenMin,
      sumMinAway: sumPointsAwayMenMin,
    })
  } else if (streakObject.record === 'scored' && streakObject.women === true) {
    const sumGoalsScoredWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const sumGoalsScoredHomeWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const sumGoalsScoredAwayWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const sumGoalsScoredWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 12`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const sumGoalsScoredHomeWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 6`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const sumGoalsScoredAwayWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 6`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const averageGoalsScoredWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const averageGoalsScoredHomeWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const averageGoalsScoredAwayWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const averageGoalsScoredWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const averageGoalsScoredHomeWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const averageGoalsScoredAwayWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    return res.status(200).json({
      avgMaxAll: averageGoalsScoredWomenMax,
      avgMaxHome: averageGoalsScoredHomeWomenMax,
      avgMaxAway: averageGoalsScoredAwayWomenMax,
      avgMinAll: averageGoalsScoredWomenMin,
      avgMinHome: averageGoalsScoredHomeWomenMin,
      avgMinAway: averageGoalsScoredAwayWomenMin,
      sumMaxAll: sumGoalsScoredWomenMax,
      sumMaxHome: sumGoalsScoredHomeWomenMax,
      sumMaxAway: sumGoalsScoredAwayWomenMax,
      sumMinAll: sumGoalsScoredWomenMin,
      sumMinHome: sumGoalsScoredHomeWomenMin,
      sumMinAway: sumGoalsScoredAwayWomenMin,
    })
  } else if (streakObject.record === 'scored' && streakObject.women === false) {
    const sumGoalsScoredMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const sumGoalsScoredHomeMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const sumGoalsScoredAwayMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const sumGoalsScoredMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 24`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const sumGoalsScoredHomeMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 12`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const sumGoalsScoredAwayMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_scored')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 12`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const averageGoalsScoredMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const averageGoalsScoredHomeMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const averageGoalsScoredAwayMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'desc']],
      limit: 10,
    })

    const averageGoalsScoredMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const averageGoalsScoredHomeMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    const averageGoalsScoredAwayMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_scored')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_scored')), 'asc']],
      limit: 10,
    })

    return res.status(200).json({
      avgMaxAll: averageGoalsScoredMenMax,
      avgMaxHome: averageGoalsScoredHomeMenMax,
      avgMaxAway: averageGoalsScoredAwayMenMax,
      avgMinAll: averageGoalsScoredMenMin,
      avgMinHome: averageGoalsScoredHomeMenMin,
      avgMinAway: averageGoalsScoredAwayMenMin,
      sumMaxAll: sumGoalsScoredMenMax,
      sumMaxHome: sumGoalsScoredHomeMenMax,
      sumMaxAway: sumGoalsScoredAwayMenMax,
      sumMinAll: sumGoalsScoredMenMin,
      sumMinHome: sumGoalsScoredHomeMenMin,
      sumMinAway: sumGoalsScoredAwayMenMin,
    })
  } else if (
    streakObject.record === 'conceded' &&
    streakObject.women === true
  ) {
    const sumGoalsConcededWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const sumGoalsConcededHomeWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const sumGoalsConcededAwayWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const sumGoalsConcededWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 12`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const sumGoalsConcededHomeWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 6`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const sumGoalsConcededAwayWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 6`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const averageGoalsConcededWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const averageGoalsConcededHomeWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const averageGoalsConcededAwayWomenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const averageGoalsConcededWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const averageGoalsConcededHomeWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: true,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const averageGoalsConcededAwayWomenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: true,
        homeGame: false,
        seasonId: { [Op.gt]: 162 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    return res.status(200).json({
      avgMaxAll: averageGoalsConcededWomenMax,
      avgMaxHome: averageGoalsConcededHomeWomenMax,
      avgMaxAway: averageGoalsConcededAwayWomenMax,
      avgMinAll: averageGoalsConcededWomenMin,
      avgMinHome: averageGoalsConcededHomeWomenMin,
      avgMinAway: averageGoalsConcededAwayWomenMin,
      sumMaxAll: sumGoalsConcededWomenMax,
      sumMaxHome: sumGoalsConcededHomeWomenMax,
      sumMaxAway: sumGoalsConcededAwayWomenMax,
      sumMinAll: sumGoalsConcededWomenMin,
      sumMinHome: sumGoalsConcededHomeWomenMin,
      sumMinAway: sumGoalsConcededAwayWomenMin,
    })
  } else if (
    streakObject.record === 'conceded' &&
    streakObject.women === false
  ) {
    const sumGoalsConcededMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const sumGoalsConcededHomeMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const sumGoalsConcededAwayMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const averageGoalsConcededMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const averageGoalsConcededHomeMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const averageGoalsConcededAwayMenMax = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'desc']],
      limit: 10,
    })

    const sumGoalsConcededMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 24`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const sumGoalsConcededHomeMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 12`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const sumGoalsConcededAwayMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('goals_conceded')), 'data'],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 12`),
      order: [[sequelize.fn('SUM', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const averageGoalsConcededMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 10`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const averageGoalsConcededHomeMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: true,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    const averageGoalsConcededAwayMenMin = await TeamGame.findAll({
      where: {
        played: true,
        women: false,
        homeGame: false,
        seasonId: { [Op.gt]: 102 },
        category: 'regular',
      },
      attributes: [
        [
          sequelize.fn(
            'round',
            sequelize.fn('AVG', sequelize.col('goals_conceded')),
            2
          ),
          'data',
        ],
      ],
      include: [
        {
          model: Team,
          attributes: ['name', 'casualName', 'shortName'],
          as: 'lag',
        },
        { model: Season },
      ],
      group: ['lag.team_id', 'season.season_id'],
      having: sequelize.literal(`count("team_game_id") >= 5`),
      order: [[sequelize.fn('AVG', sequelize.col('goals_conceded')), 'asc']],
      limit: 10,
    })

    return res.status(200).json({
      avgMaxAll: averageGoalsConcededMenMax,
      avgMaxHome: averageGoalsConcededHomeMenMax,
      avgMaxAway: averageGoalsConcededAwayMenMax,
      avgMinAll: averageGoalsConcededMenMin,
      avgMinHome: averageGoalsConcededHomeMenMin,
      avgMinAway: averageGoalsConcededAwayMenMin,
      sumMaxAll: sumGoalsConcededMenMax,
      sumMaxHome: sumGoalsConcededHomeMenMax,
      sumMaxAway: sumGoalsConcededAwayMenMax,
      sumMinAll: sumGoalsConcededMenMin,
      sumMinHome: sumGoalsConcededHomeMenMin,
      sumMinAway: sumGoalsConcededAwayMenMin,
    })
  }

  if (streakObject.record === 'generalStats' && streakObject.women) {
    const golds = await sequelize.query(
      `
  select count(distinct season_id) as guld, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = true and category = 'final' and win = true
group by casual_name,team
order by count(distinct season_id) desc;
  `,
      { type: QueryTypes.SELECT }
    )

    const finals = await sequelize.query(
      `
  select count(distinct season_id) as finals, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = true and category = 'final'
group by casual_name,team
order by count(distinct season_id) desc;
  `,
      { type: QueryTypes.SELECT }
    )

    const playoffs = await sequelize.query(
      `
  select count(distinct season_id) as playoffs, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = true and category = any(array['quarter','semi','final'])
group by casual_name, team
order by count(distinct season_id) desc
limit 10;
  `,
      { type: QueryTypes.SELECT }
    )

    const seasons = await sequelize.query(
      `
  select count(distinct season_id) as seasons, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = true
group by casual_name, team
order by count(distinct season_id) desc
limit 10;
  `,
      { type: QueryTypes.SELECT }
    )

    return res.status(200).json({ golds, finals, seasons, playoffs })
  } else if (
    streakObject.record === 'generalStats' &&
    streakObject.women === false
  ) {
    const golds = await sequelize.query(
      `
  select count(distinct season_id) as guld, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = false and category = 'final' and win = true
group by casual_name,team
order by count(distinct season_id) desc;
  `,
      { type: QueryTypes.SELECT }
    )

    const finals = await sequelize.query(
      `
  select count(distinct season_id) as finals, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = false and category = 'final'
group by casual_name,team
order by count(distinct season_id) desc;
  `,
      { type: QueryTypes.SELECT }
    )

    const playoffs = await sequelize.query(
      `
  select count(distinct season_id) as playoffs, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = false and category = any(array['quarter','semi','final']) and season_id >= 25
group by casual_name, team
order by count(distinct season_id) desc
limit 10;
  `,
      { type: QueryTypes.SELECT }
    )

    const seasons = await sequelize.query(
      `
  select count(distinct season_id) as seasons, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = false and season_id >= 25
group by casual_name, team
order by count(distinct season_id) desc
limit 10;
  `,
      { type: QueryTypes.SELECT }
    )

    const allPlayoffs = await sequelize.query(
      `
  select count(distinct season_id) as playoffs, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = false and category = any(array['quarter','semi','final'])
group by casual_name, team
order by count(distinct season_id) desc
limit 10;
  `,
      { type: QueryTypes.SELECT }
    )

    const allSeasons = await sequelize.query(
      `
  select count(distinct season_id) as seasons, team, casual_name
from teamgames
join teams on teamgames.team = teams.team_id
where teamgames.women = false
group by casual_name, team
order by count(distinct season_id) desc
limit 10;
  `,
      { type: QueryTypes.SELECT }
    )

    return res.status(200).json({
      golds,
      finals,
      seasons,
      allSeasons,
      playoffs,
      allPlayoffs,
    })
  }
}) as RequestHandler)

export default streakRouter
