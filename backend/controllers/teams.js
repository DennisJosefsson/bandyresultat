const router = require('express').Router()
const { Op, QueryTypes } = require('sequelize')
const { sequelize } = require('../utils/db')
const { Team, Table, Season, TeamSeason, TeamGame } = require('../models')

router.get('/', async (req, res) => {
  const teams = await Team.findAll({
    order: [['casualName', 'ASC']],
  })

  console.log('teams request', new Date())
  res.json(teams)
})

router.get('/latest', async (req, res) => {
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

  console.log('teams request', new Date())
  res.json(teams)
})

router.get('/:teamId', async (req, res) => {
  console.log(req.params.teamId)
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

  const tabeller = await TeamGame.findAll({
    where: {
      team: req.params.teamId,
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
where category != 'qualification' and team = $teamId),

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
where category != 'qualification' and team = $teamId),

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
where category != 'qualification' and team = $teamId),

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
where category != 'qualification' and team = $teamId),

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
where category != 'qualification' and team = $teamId),

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

  console.log('teams request', new Date())
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
    })
  }
})

router.post('/', async (req, res, next) => {
  console.log(req.body)
  const team = await Team.create(req.body)
  res.json(team)
})

router.delete('/:teamId', async (req, res, next) => {
  const team = await Team.findByPk(req.params.teamId)
  if (!team) {
    throw new Error('No such team in the database')
  } else {
    await team.destroy()
    res.json({ message: 'team deleted' })
  }
})

router.put('/:teamId', async (req, res, next) => {
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
