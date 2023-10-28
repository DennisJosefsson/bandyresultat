const router = require('express').Router()
const { Game, Team, Season, TeamGame, Serie } = require('../models')
const { sequelize } = require('../utils/db')
const { Op, QueryTypes, Model } = require('sequelize')
const { authControl } = require('../utils/middleware')
const dayjs = require('dayjs')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

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

router.post('/search', async (req, res) => {
  let where = {}
  where.category = req.body.categoryArray
  where.played = true

  let limit = req.body.limit.value || 10

  const startSeasonName =
    req.body.startSeason < 1964
      ? req.body.startSeason
      : `${Number(req.body.startSeason) - 1}/${req.body.startSeason}`

  const endSeasonName =
    req.body.endSeason < 1964
      ? req.body.endSeason
      : `${Number(req.body.endSeason) - 1}/${req.body.endSeason}`

  let include = [
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
    { model: Game, attributes: ['result'] },
    {
      model: Season,
      where: {
        year: {
          [Op.and]: {
            [Op.gte]: startSeasonName,
            [Op.lte]: endSeasonName,
          },
        },
      },
      attributes: ['year', 'seasonId'],
    },
  ]

  let order = [['date', req.body.order.value]]

  if (req.body.team) {
    where.team = req.body.team.value
  }

  if (req.body.opponent) {
    where.opponent = req.body.opponent.value
  }

  if (req.body.inputDate) {
    const date =
      '2024-' +
      req.body.inputDate.split('/')[1] +
      '-' +
      req.body.inputDate.split('/')[0]

    if (!dayjs(date, 'YYYY-M-D', true).isValid()) {
      return res.json({ status: 400, message: 'Felaktigt datum' })
    } else {
      const month = date.split('-')[1]
      const day = date.split('-')[2]
      where = {
        ...where,
        [Op.and]: [
          sequelize.fn('extract(month from game."date") =', month),
          sequelize.fn('extract(day from game."date") =', day),
        ],
      }
    }
  }

  if (req.body.goalDiff) {
    if (req.body.operator.value === 'gte') {
      where.goalDifference = {
        [Op.gte]: req.body.goalDiff,
      }
    } else if (req.body.operator.value === 'eq') {
      where.goalDifference = {
        [Op.eq]: req.body.goalDiff,
      }
    } else if (req.body.operator.value === 'lte') {
      where.goalDifference = {
        [Op.and]: {
          [Op.lte]: req.body.goalDiff,
          [Op.gte]: 0,
        },
      }
    }
  }

  if (req.body.orderVar.value === 'goalDiff') {
    order.unshift(['goalDifference', req.body.order.value])
  }

  if (req.body.orderVar.value === 'totalGoals') {
    order.unshift(['totalGoals', req.body.order.value])
  }

  if (req.body.orderVar.value === 'goalsScored') {
    order.unshift(['goalsScored', req.body.order.value])
  }

  if (req.body.orderVar.value === 'goalsConceded') {
    order.unshift(['goalsConceded', req.body.order.value])
  }

  if (req.body.homeGame === 'home') {
    where.homeGame = true
  }

  if (req.body.homeGame === 'away') {
    where.homeGame = false
  }

  if (req.body.gameResult === 'win') {
    where.win = true
  }

  if (req.body.gameResult === 'draw') {
    where.draw = true
  }

  if (req.body.gameResult === 'lost') {
    where.lost = true
  }

  if (
    req.body.selectedGender === 'men' &&
    (req.body.team === '' || req.body.team === null)
  ) {
    where.women = false
  }

  if (
    req.body.selectedGender === 'women' &&
    (req.body.team === '' || req.body.team === null)
  ) {
    where.women = true
  }

  if (req.body.result && req.body.team) {
    where.goalsScored = req.body.result.split('-')[0]
    where.goalsConceded = req.body.result.split('-')[1]
  } else if (req.body.result) {
    const resultGame = { model: Game, where: { result: req.body.result } }
    include.push(resultGame)
  }

  if (
    ((req.body.team === '' || req.body.team === null) && req.body.result) ||
    ((req.body.team === '' || req.body.team === null) &&
      req.body.gameResult === 'draw') ||
    ((req.body.team === '' || req.body.team === null) &&
      req.body.orderVar.value === 'totalGoals') ||
    (req.body.goalDiff && req.body.goalDiff === 0)
  ) {
    limit = req.body.limit.value * 2 || 20
  }

  const searchResult = await TeamGame.findAndCountAll({
    where,
    include,
    limit,
    order,
  })

  if (!searchResult) {
    res.json({
      status: 404,
      message: 'Hittade ingen match som matchade sökningen.',
    })
  } else {
    res.json({ hits: searchResult.count, searchResult: searchResult.rows })
  }
})

router.post('/streaks', async (req, res) => {
  if (req.body.record === 'streaks' && req.body.women === true) {
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

    return res.json({
      losingStreak: womenLosingStreak,
      drawStreak: womenDrawStreak,
      winStreak: womenWinStreak,
      noWinStreak: womenNoWinStreak,
      unbeatenStreak: womenUnbeatenStreak,
    })
  } else if (req.body.record === 'streaks' && req.body.women === false) {
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
    return res.json({
      losingStreak: menLosingStreak,
      drawStreak: menDrawStreak,
      winStreak: menWinStreak,
      noWinStreak: menNoWinStreak,
      unbeatenStreak: menUnbeatenStreak,
    })
  } else if (req.body.record === 'points' && req.body.women === true) {
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

    return res.json({
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
  } else if (req.body.record === 'points' && req.body.women === false) {
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

    return res.json({
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
  } else if (req.body.record === 'scored' && req.body.women === true) {
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

    return res.json({
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
  } else if (req.body.record === 'scored' && req.body.women === false) {
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

    return res.json({
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
  } else if (req.body.record === 'conceded' && req.body.women === true) {
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

    return res.json({
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
  } else if (req.body.record === 'conceded' && req.body.women === false) {
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

    return res.json({
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
})

router.get('/season/:seasonId', async (req, res, next) => {
  const seasonName =
    req.params.seasonId < 1964
      ? req.params.seasonId
      : `${Number(req.params.seasonId) - 1}/${req.params.seasonId}`

  const seasonExist = await Season.count({ where: { year: seasonName } })
  if (seasonExist === 0) {
    return res.json({ success: 'false', message: 'Säsong finns inte' })
  }

  const games = await Game.findAll({
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

router.get('/stats/:seasonId', async (req, res) => {
  const seasonName =
    req.params.seasonId < 1964
      ? req.params.seasonId
      : `${Number(req.params.seasonId) - 1}/${req.params.seasonId}`

  const seasonExist = await Season.count({ where: { year: seasonName } })
  if (seasonExist === 0) {
    return res.json({ success: 'false', message: 'Säsong finns inte' })
  }

  const goalsScoredTotal = await TeamGame.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      [sequelize.fn('SUM', sequelize.col('total_goals')), 'data'],
    ],
    group: ['teamgame.women', 'season.year', 'season.season_id'],
  })

  const goalsScoredTotalCat = await TeamGame.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      'category',
      [sequelize.fn('SUM', sequelize.col('total_goals')), 'data'],
    ],
    group: ['teamgame.women', 'category', 'season.year', 'season.season_id'],
  })

  const goalsScoredHomeTotal = await Game.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      [sequelize.fn('SUM', sequelize.col('home_goal')), 'data'],
    ],
    group: ['game.women', 'season.year', 'season.season_id'],
  })

  const goalsScoredHomeTotalCat = await Game.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      'category',
      [sequelize.fn('SUM', sequelize.col('home_goal')), 'data'],
    ],
    group: ['game.women', 'category', 'season.year', 'season.season_id'],
  })

  const goalsScoredAwayTotal = await Game.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      [sequelize.fn('SUM', sequelize.col('away_goal')), 'data'],
    ],
    group: ['game.women', 'season.year', 'season.season_id'],
  })

  const goalsScoredAwayTotalCat = await Game.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      'category',
      [sequelize.fn('SUM', sequelize.col('away_goal')), 'data'],
    ],
    group: ['game.women', 'category', 'season.year', 'season.season_id'],
  })

  const goalsScoredAverage = await TeamGame.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('total_goals')),
          2
        ),
        'data',
      ],
    ],
    group: ['teamgame.women', 'season.year', 'season.season_id'],
  })

  const goalsScoredAverageCat = await TeamGame.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      'category',
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('total_goals')),
          2
        ),
        'data',
      ],
    ],
    group: ['teamgame.women', 'category', 'season.year', 'season.season_id'],
  })

  const goalsScoredHomeAverage = await Game.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('home_goal')),
          2
        ),
        'data',
      ],
    ],
    group: ['game.women', 'season.year', 'season.season_id'],
  })

  const goalsScoredHomeAverageCat = await Game.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      'category',
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('home_goal')),
          2
        ),
        'data',
      ],
    ],
    group: ['game.women', 'category', 'season.year', 'season.season_id'],
  })

  const goalsScoredAwayAverage = await Game.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('away_goal')),
          2
        ),
        'data',
      ],
    ],
    group: ['game.women', 'season.year', 'season.season_id'],
  })

  const goalsScoredAwayAverageCat = await Game.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    attributes: [
      'women',
      'category',
      [
        sequelize.fn(
          'round',
          sequelize.fn('AVG', sequelize.col('away_goal')),
          2
        ),
        'data',
      ],
    ],
    group: ['game.women', 'category', 'season.year', 'season.season_id'],
  })

  const gamesCountTotal = await Game.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    group: ['game.women', 'season.year', 'season.season_id'],
  })

  const gamesCountTotalCat = await Game.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    group: ['game.women', 'category', 'season.year', 'season.season_id'],
  })

  const winCountHomeTeam = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    where: { homeGame: true, win: true },
    group: ['teamgame.women', 'season.year', 'season.season_id'],
  })

  const winCountAwayTeam = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    where: { homeGame: false, win: true },
    group: ['teamgame.women', 'season.year', 'season.season_id'],
  })

  const drawCount = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    where: { draw: true },
    group: ['teamgame.women', 'season.year', 'season.season_id'],
  })

  const winCountHomeTeamCat = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    where: { homeGame: true, win: true },
    group: ['teamgame.women', 'category', 'season.year', 'season.season_id'],
  })

  const winCountAwayTeamCat = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    where: { homeGame: false, win: true },
    group: ['teamgame.women', 'category', 'season.year', 'season.season_id'],
  })

  const drawCountCat = await TeamGame.count({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonName } },
      attributes: ['year', 'seasonId'],
    },
    where: { draw: true },
    group: ['teamgame.women', 'category', 'season.year', 'season.season_id'],
  })

  const losingStreak = await sequelize.query(
    `with lost_values as (
select 
	team,
	lost, 
	"date",
  teamgames.women,
  "year",
	case when lost = true then 1 else 0 end lost_value
from teamgames
join seasons on seasons.season_id = teamgames.season_id
where category != 'qualification' and played = true and "year" = $season_name),

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
	casual_name,
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id 
where array_length(dates, 1) > 3
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )

  const drawStreak = await sequelize.query(
    `with draw_values as (
select 
	team,
	draw, 
	"date",
  teamgames.women,
  "year",
	case when draw = true then 1 else 0 end draw_value
from teamgames
join seasons on seasons.season_id = teamgames.season_id
where category != 'qualification' and played = true and "year" = $season_name),

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
	casual_name,
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id
where array_length(dates, 1) > 2 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )

  const winStreak = await sequelize.query(
    `with win_values as (
select 
	team,
	win, 
	"date",
  teamgames.women,
  "year",
	case when win = true then 1 else 0 end win_value
from teamgames
join seasons on seasons.season_id = teamgames.season_id
where category != 'qualification' and played = true and "year" = $season_name),

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
	casual_name,
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id
where array_length(dates, 1) > 5 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )

  const noWinStreak = await sequelize.query(
    `with win_values as (
select 
	team,
	win, 
	"date",
  teamgames.women,
  "year",
	case when win = false then 1 else 0 end win_value
from teamgames
join seasons on seasons.season_id = teamgames.season_id
where category != 'qualification' and played = true and "year" = $season_name),

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
	casual_name,
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id
where array_length(dates, 1) > 5 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )

  const unbeatenStreak = await sequelize.query(
    `with win_values as (
select 
	team,
  "year",
	lost, 
	"date",
  teamgames.women,
	case when lost = false then 1 else 0 end win_value
from teamgames
join seasons on seasons.season_id = teamgames.season_id
where category != 'qualification' and played = true and "year" = $season_name),

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
	casual_name,
  group_array.women,
	array_length(dates, 1) as game_count,
	dates[1] as start_date,
	dates[array_upper(dates,1)] as end_date
from group_array
join teams on group_array.team = teams.team_id
where array_length(dates, 1) > 5 
order by game_count desc, start_date asc
limit 3;
`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )
  const maxGoalsMen = await sequelize.query(
    `with max_goals as (
select
	games."date" as datum,
	games.result as resultat,
	games.home_team_id as home,
	games.away_team_id as away,
	(home_goal + away_goal) as sum_goals
from games
join seasons on seasons.season_id = games.season_id

where (home_goal + away_goal) = 
		(
			select 
		 	max(away_goal + home_goal) 
		 	from games
		 	join seasons on games.season_id = seasons.season_id 
		 	where "year" = $season_name 
				and games.women = false 
				
		)
and "year" = $season_name and games.women = false)

select
	home_team."casual_name" as home_name,
	away_team."casual_name" as away_name,
	datum,
	resultat,
	sum_goals
from max_goals
join teams as home_team on max_goals.home = home_team.team_id
join teams as away_team on max_goals.away = away_team.team_id;
`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )
  const maxGoalsWomen = await sequelize.query(
    `with max_goals as (
select
	games."date" as datum,
	games.result as resultat,
	games.home_team_id as home,
	games.away_team_id as away,
	(home_goal + away_goal) as sum_goals
from games
join seasons on seasons.season_id = games.season_id

where (home_goal + away_goal) = 
		(
			select 
		 	max(away_goal + home_goal) 
		 	from games
		 	join seasons on games.season_id = seasons.season_id 
		 	where "year" = $season_name 
				and games.women = true 
				
		)
and "year" = $season_name and games.women = true)

select
	home_team."casual_name" as home_name,
	away_team."casual_name" as away_name,
	datum,
	resultat,
	sum_goals
from max_goals
join teams as home_team on max_goals.home = home_team.team_id
join teams as away_team on max_goals.away = away_team.team_id;
`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )
  const minGoalsMen = await sequelize.query(
    `with min_goals as (
select
	games."date" as datum,
	games.result as resultat,
	games.home_team_id as home,
	games.away_team_id as away,
	(home_goal + away_goal) as sum_goals
from games
join seasons on seasons.season_id = games.season_id

where (home_goal + away_goal) = 
		(
			select 
		 	min(away_goal + home_goal) 
		 	from games
		 	join seasons on games.season_id = seasons.season_id 
		 	where "year" = $season_name 
				and games.women = false 
				
		)
and "year" = $season_name and games.women = false)

select
	home_team."casual_name" as home_name,
	away_team."casual_name" as away_name,
	datum,
	resultat,
	sum_goals
from min_goals
join teams as home_team on min_goals.home = home_team.team_id
join teams as away_team on min_goals.away = away_team.team_id;
`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )
  const minGoalsWomen = await sequelize.query(
    `with min_goals as (
select
	games."date" as datum,
	games.result as resultat,
	games.home_team_id as home,
	games.away_team_id as away,
	(home_goal + away_goal) as sum_goals
from games
join seasons on seasons.season_id = games.season_id

where (home_goal + away_goal) = 
		(
			select 
		 	min(away_goal + home_goal) 
		 	from games
		 	join seasons on games.season_id = seasons.season_id 
		 	where "year" = $season_name 
				and games.women = true 
				
		)
and "year" = $season_name and games.women = true)

select
	home_team."casual_name" as home_name,
	away_team."casual_name" as away_name,
	datum,
	resultat,
	sum_goals
from min_goals
join teams as home_team on min_goals.home = home_team.team_id
join teams as away_team on min_goals.away = away_team.team_id;
`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )

  const maxDiffMen = await sequelize.query(
    `with max_diff as (
select
	games."date" as datum,
	games.result as resultat,
	games.home_team_id as home,
	games.away_team_id as away,
	goal_difference
from teamgames
join seasons on seasons.season_id = teamgames.season_id
join games on teamgames.game_id = games.game_id
	
where goal_difference = 
		(
			select 
		 	max(goal_difference) 
		 	from teamgames
		 	join seasons on teamgames.season_id = seasons.season_id 
		 	where "year" = $season_name 
				and teamgames.women = false 
				
		)
and "year" = $season_name and teamgames.women = false and teamgames.played = true)

select
	home_team."casual_name" as home_name,
	away_team."casual_name" as away_name,
	datum,
	resultat,
	goal_difference
from max_diff
join teams as home_team on max_diff.home = home_team.team_id
join teams as away_team on max_diff.away = away_team.team_id;`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )
  const maxDiffWomen = await sequelize.query(
    `with max_diff as (
select
	games."date" as datum,
	games.result as resultat,
	games.home_team_id as home,
	games.away_team_id as away,
	goal_difference
from teamgames
join seasons on seasons.season_id = teamgames.season_id
join games on teamgames.game_id = games.game_id
	
where goal_difference = 
		(
			select 
		 	max(goal_difference) 
		 	from teamgames
		 	join seasons on teamgames.season_id = seasons.season_id 
		 	where "year" = $season_name 
				and teamgames.women = true 
				
		)
and "year" = $season_name and teamgames.women = true and teamgames.played = true)

select
	home_team."casual_name" as home_name,
	away_team."casual_name" as away_name,
	datum,
	resultat,
	goal_difference
from max_diff
join teams as home_team on max_diff.home = home_team.team_id
join teams as away_team on max_diff.away = away_team.team_id;`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )

  res.json({
    gamesCountTotal,
    gamesCountTotalCat,
    winCountHomeTeam,
    winCountAwayTeam,
    drawCount,
    winCountHomeTeamCat,
    winCountAwayTeamCat,
    drawCountCat,
    goalsScoredTotal,
    goalsScoredTotalCat,
    goalsScoredAverage,
    goalsScoredAverageCat,
    goalsScoredHomeTotal,
    goalsScoredAwayTotal,
    goalsScoredHomeTotalCat,
    goalsScoredAwayTotalCat,
    goalsScoredHomeAverage,
    goalsScoredAwayAverage,
    goalsScoredHomeAverageCat,
    goalsScoredAwayAverageCat,
    unbeatenStreak,
    winStreak,
    drawStreak,
    noWinStreak,
    losingStreak,
    maxGoalsMen,
    maxGoalsWomen,
    minGoalsMen,
    minGoalsWomen,
    maxDiffMen,
    maxDiffWomen,
  })
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
  const { serieId } = await Serie.findOne({
    where: { seasonId: req.body.seasonId, serieGroupCode: req.body.group },
    raw: true,
  })

  const gameData = {
    ...req.body,
    serieId,
    homeTeamId: req.body.homeTeamId.value,
    awayTeamId: req.body.awayTeamId.value,
    homeGoal: parseInt(req.body.result.split('-')[0]),
    awayGoal: parseInt(req.body.result.split('-')[1]),
    halftimeHomeGoal: req.body.halftimeResult
      ? parseInt(req.body.halftimeResult.split('-')[0])
      : null,
    halftimeAwayGoal: req.body.halftimeResult
      ? parseInt(req.body.halftimeResult.split('-')[1])
      : null,
    played: req.body.result !== null ? true : false,
  }

  const [game, created] = await Game.upsert({ ...gameData })

  let homeTeamGame
  let awayTeamGame
  const homeTeamGameData = homeTeam(game)
  const awayTeamGameData = awayTeam(game)

  const teamGames = await TeamGame.findAll({
    where: { gameId: game.gameId },
    raw: true,
  })

  if (teamGames.length === 0) {
    homeTeamGame = await TeamGame.create({
      ...homeTeamGameData,
    })
    awayTeamGame = await TeamGame.create({
      ...awayTeamGameData,
    })
  } else {
    const homeGame = teamGames.find((teamgame) => teamgame.homeGame === true)

    const awayGame = teamGames.find((teamgame) => teamgame.homeGame === false)

    homeTeamGame = await TeamGame.upsert({
      teamGameId: homeGame.teamGameId,

      ...homeTeamGameData,
    })
    awayTeamGame = await TeamGame.upsert({
      teamGameId: awayGame.teamGameId,

      ...awayTeamGameData,
    })
  }

  res.json({ game, homeTeamGame, awayTeamGame })
})

router.delete('/:gameId', authControl, async (req, res, next) => {
  const game = await Game.findByPk(req.params.gameId)
  if (!game) {
    throw new Error('No such game in the database')
  } else {
    await game.destroy()
    res.json({ message: 'Game deleted' })
  }
})

router.put('/:gameId', authControl, async (req, res, next) => {
  const game = await Game.findByPk(req.params.gameId)
  if (!game) {
    throw new Error('No such game in the database')
  } else {
    game.set(req.body)
    await game.save()
    res.json(game)
  }
})

const homeTeam = (gameData) => {
  let points, win, lost, draw
  const {
    gameId,
    homeTeamId,
    awayTeamId,
    homeGoal,
    awayGoal,
    date,
    category,
    group,
    playoff,
    women,
    seasonId,
    played,
  } = gameData

  const goalDifference = homeGoal - awayGoal
  const qualificationGame = category === 'qualification' ? true : false
  if (!played) {
    return {
      gameId,
      seasonId,
      team: homeTeamId,
      opponent: awayTeamId,
      goalsScored: 0,
      goalsConceded: 0,
      goalDifference: 0,
      points: 0,
      qualificationGame,
      category,
      group,
      playoff,
      women,
      date,
      played,
      homeGame: true,
    }
  }
  if (homeGoal > awayGoal) {
    points = 2
    win = true
    lost = false
    draw = false
  } else if (homeGoal < awayGoal) {
    points = 0
    win = false
    lost = true
    draw = false
  } else {
    points = 1
    draw = true
    win = false
    lost = false
  }

  return {
    gameId,
    seasonId,
    team: homeTeamId,
    opponent: awayTeamId,
    goalsScored: parseInt(homeGoal),
    goalsConceded: parseInt(awayGoal),
    goalDifference,
    points,
    win,
    draw,
    lost,
    qualificationGame,
    category,
    group,
    playoff,
    women,
    date,
    played,
    homeGame: true,
  }
}
const awayTeam = (gameData) => {
  let points, win, lost, draw
  const {
    gameId,
    homeTeamId,
    awayTeamId,
    homeGoal,
    awayGoal,
    date,
    category,
    group,
    playoff,
    women,
    seasonId,
    played,
  } = gameData
  const goalDifference = awayGoal - homeGoal
  const qualificationGame = category === 'qualification' ? true : false
  if (!played) {
    return {
      gameId,
      seasonId,
      team: awayTeamId,
      opponent: homeTeamId,
      goalsScored: 0,
      goalsConceded: 0,
      goalDifference: 0,
      points: 0,
      qualificationGame,
      category,
      group,
      playoff,
      women,
      date,
      played,
      homeGame: false,
    }
  }
  if (awayGoal > homeGoal) {
    points = 2
    win = true
    lost = false
    draw = false
  } else if (awayGoal < homeGoal) {
    points = 0
    win = false
    lost = true
    draw = false
  } else {
    points = 1
    draw = true
    win = false
    lost = false
  }

  return {
    gameId,
    seasonId,
    team: awayTeamId,
    opponent: homeTeamId,
    goalsScored: parseInt(awayGoal),
    goalsConceded: parseInt(homeGoal),
    goalDifference,
    points,
    win,
    draw,
    lost,
    qualificationGame,
    category,
    group,
    playoff,
    women,
    date,
    played,
    homeGame: false,
  }
}

module.exports = router
