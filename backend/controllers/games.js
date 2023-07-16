const router = require('express').Router()
const { Game, Team, Season, TeamGame } = require('../models')
const { sequelize } = require('../utils/db')
const { Op, QueryTypes } = require('sequelize')

router.get('/', async (req, res, next) => {
  const games = await Game.findAll({
    attributes: [
      'gameId',
      'date',
      'result',
      'halftimeResult',
      'homeGoal',
      'awayGoal',
      'halftimeHomeGoal',
      'halftimeAwayGoal',
      'category',
      'group',
      'women',
      'playoff',
    ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'homeTeam',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'awayTeam',
      },
      { model: Season, attributes: ['year', 'seasonId'] },
    ],
  })
  if (!games) {
    throw new Error('No such game in the database')
  } else {
    res.json(games)
  }
})

router.get('/streaks', async (req, res) => {
  const losingStreak = await sequelize.query(
    `with lost_values as (
select 
	team,
	lost, 
	"date",
  women,
	case when lost = true then 1 else 0 end lost_value
from teamgames
where category != 'qualification'),

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
order by game_count desc
limit 10;
`,
    { type: QueryTypes.SELECT }
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
where category != 'qualification'),

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
order by game_count desc
limit 10;
`,
    { type: QueryTypes.SELECT }
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
where category != 'qualification'),

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
order by game_count desc
limit 10;
`,
    { type: QueryTypes.SELECT }
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
where category != 'qualification'),

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
order by game_count desc
limit 10;
`,
    { type: QueryTypes.SELECT }
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
where category != 'qualification'),

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
order by game_count desc
limit 10;
`,
    { type: QueryTypes.SELECT }
  )

  res.json({ unbeatenStreak, noWinStreak, winStreak, drawStreak, losingStreak })
})

router.get('/season/:seasonId', async (req, res, next) => {
  const seasonName =
    req.params.seasonId < 1964
      ? req.params.seasonId
      : `${Number(req.params.seasonId) - 1}/${req.params.seasonId}`
  const games = await Game.findAll({
    // where: { seasonId: req.params.seasonId },
    // attributes: [
    //   'gameId',
    //   'date',
    //   'result',
    //   'halftimeResult',
    //   'homeGoal',
    //   'awayGoal',
    //   'halftimeHomeGoal',
    //   'halftimeAwayGoal',
    //   'category',
    //   'group',
    //   'women',
    //   'playoff',
    // ],
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'homeTeam',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'awayTeam',
      },
      {
        model: Season,
        where: { year: { [Op.eq]: seasonName } },
        attributes: ['year', 'seasonId'],
      },
    ],
    order: [
      ['group', 'ASC'],
      ['date', 'ASC'],
    ],
  })

  if (!games) {
    throw new Error('No such game in the database')
  } else {
    res.json(games)
  }
})

router.get('/:gameId', async (req, res, next) => {
  const game = await Game.findByPk(req.params.gameId, {
    attributes: ['date', 'result'],
    include: [
      {
        model: Team,
        attributes: ['name', 'casualName', 'shortName'],
        as: 'homeTeam',
      },
      {
        model: Team,
        attributes: ['name', 'casualName', 'shortName'],
        as: 'awayTeam',
      },
      { model: Season, attributes: ['year'] },
    ],
  })
  if (!game) {
    throw new Error('No such game in the database')
  } else {
    res.json(game)
  }
})

router.post('/', async (req, res, next) => {
  const [game, created] = await Game.upsert(req.body)
  console.log(created)
  res.json(game)
})

router.delete('/:gameId', async (req, res, next) => {
  const game = await Game.findByPk(req.params.gameId)
  if (!game) {
    throw new Error('No such game in the database')
  } else {
    await game.destroy()
    res.json({ message: 'Game deleted' })
  }
})

router.put('/:gameId', async (req, res, next) => {
  const game = await Game.findByPk(req.params.gameId)
  if (!game) {
    throw new Error('No such game in the database')
  } else {
    game.set(req.body)
    await game.save()
    res.json(game)
  }
})

module.exports = router
