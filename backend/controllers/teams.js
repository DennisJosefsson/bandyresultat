const router = require('express').Router()
const { Op, QueryTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const { Team, Table, Season, TeamSeason, TeamGame } = require('../models')
const { authControl } = require('../utils/middleware')

router.get('/', async (req, res, next) => {
  res.locals.origin = 'GET All teams router'
  const teams = await Team.findAll({
    order: [[sequelize.literal(`casual_name collate "se-SE-x-icu"`), 'ASC']],
  })

  res.json(teams)
})

router.get('/latest', async (req, res, next) => {
  res.locals.origin = 'GET Latest Season router'
  let women = false
  const teams = await TeamSeason.findAll({
    where: {
      seasonId: [
        sequelize.literal(
          `SELECT MAX("season_id") FROM "teamseasons" WHERE "women" = $women`
        ),
      ],
    },
    bind: { women },
  })

  res.json(teams)
})

router.get('/:teamId', async (req, res, next) => {
  res.locals.origin = 'GET Single Team router'
  const team = await Team.findByPk(req.params.teamId, {
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
    return res.json({ success: 'false', message: 'Laget finns inte.' })
  }

  const tabeller = await TeamGame.findAll({
    where: {
      team: req.params.teamId,
      played: true,
    },
    attributes: [
      'category',
      [sequelize.fn('count', sequelize.col('team_game_id')), 'total_games'],
      [sequelize.fn('sum', sequelize.col('points')), 'total_points'],
      [
        sequelize.fn('sum', sequelize.col('goals_scored')),
        'total_goals_scored',
      ],
      [
        sequelize.fn('sum', sequelize.col('goals_conceded')),
        'total_goals_conceded',
      ],
      [
        sequelize.fn('sum', sequelize.col('goal_difference')),
        'total_goal_difference',
      ],
      [sequelize.literal(`(count(*) filter (where win))`), 'total_wins'],
      [sequelize.literal(`(count(*) filter (where draw))`), 'total_draws'],
      [sequelize.literal(`(count(*) filter (where lost))`), 'total_lost'],
    ],
    group: ['category'],
    order: [
      ['category'],
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })

  const finalsAndWins = await TeamGame.findAll({
    where: { team: req.params.teamId, category: 'final' },
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
    { bind: { teamId: req.params.teamId }, type: QueryTypes.SELECT }
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
    { bind: { teamId: req.params.teamId }, type: QueryTypes.SELECT }
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
    { bind: { teamId: req.params.teamId }, type: QueryTypes.SELECT }
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
    { bind: { teamId: req.params.teamId }, type: QueryTypes.SELECT }
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
    { bind: { teamId: req.params.teamId }, type: QueryTypes.SELECT }
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
    { bind: { teamId: req.params.teamId }, type: QueryTypes.SELECT }
  )

  const playoffCount = await sequelize.query(
    `select count(distinct season_id) as playoff_count
from teamgames
where team = $teamId and "category" = any(array['quarter', 'semi', 'final']) and season_id >= 25;`,
    { bind: { teamId: req.params.teamId }, type: QueryTypes.SELECT }
  )

  if (!team) {
    throw new Error('No such team in the database')
  } else {
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
    })
  }
})

router.post('/', authControl, async (req, res, next) => {
  res.locals.origin = 'POST Team router'
  const team = await Team.create(req.body)
  res.json(team)
})

router.delete('/:teamId', authControl, async (req, res, next) => {
  res.locals.origin = 'DELETE Team router'
  const team = await Team.findByPk(req.params.teamId)
  if (!team) {
    throw new Error('No such team in the database')
  } else {
    await team.destroy()
    res.json({ message: 'team deleted' })
  }
})

router.put('/:teamId', authControl, async (req, res, next) => {
  res.locals.origin = 'PUT Team router'
  const team = await Team.findByPk(req.params.teamId)
  if (!team) {
    throw new Error('No such team in the database')
  } else {
    team.set(req.body)
    await team.save()
    res.json(team)
  }
})

module.exports = router
