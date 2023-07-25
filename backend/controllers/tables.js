const router = require('express').Router()
const { sequelize } = require('../utils/db')
const { Op, QueryTypes } = require('sequelize')
const { Table, Season, Team, TeamGame } = require('../models')

router.get('/maraton', async (req, res) => {
  const maratonTabell = await TeamGame.findAll({
    where: { category: 'regular' },
    attributes: [
      'team',
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
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName', 'women'],
        as: 'lag',
      },
    ],
    group: [
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'lag.women',
    ],
    order: [
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })
  res.json(maratonTabell)
})

router.post('/compare', async (req, res) => {
  console.log(new Date())
  const array = req.body
  const tabeller = await TeamGame.findAll({
    where: {
      team: {
        [Op.in]: array,
      },
      opponent: {
        [Op.in]: array,
      },
    },
    attributes: [
      'team',
      'opponent',
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
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'opp',
      },
    ],
    group: [
      'team',
      'opponent',
      'category',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'opp.name',
      'opp.team_id',
      'opp.casual_name',
      'opp.short_name',
    ],
    order: [
      ['team', 'DESC'],
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })
  res.json(tabeller)
})

router.get('/:seasonId', async (req, res) => {
  const seasonName =
    req.params.seasonId < 1964
      ? req.params.seasonId
      : `${Number(req.params.seasonId) - 1}/${req.params.seasonId}`
  const tabell = await TeamGame.findAll({
    // where: { seasonId: req.params.seasonId },
    attributes: [
      'team',
      'group',
      'women',
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
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
      {
        model: Season,
        attributes: ['seasonId', 'year'],
        where: { year: { [Op.eq]: seasonName } },
      },
    ],
    group: [
      'group',
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'category',
      'season.season_id',
      'season.year',
      'teamgame.women',
    ],
    order: [
      ['group', 'DESC'],
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })

  const roundByRoundTables = await sequelize.query(
    `with win_draw_lost_values as (
select 
	team,
	case when win = true then 1 else 0 end as win_var,
	case when draw = true then 1 else 0 end as draw_var,
	case when lost = true then 1 else 0 end as lost_var,
	win,
	draw,
	lost,
	"date",
	points,
	goals_scored,
	goals_conceded,
	goal_difference,
  "group",
	"year",
	teamgames.women as womens_table
from teamgames
join seasons on teamgames.season_id = seasons.season_id
where "year" = $season_name and category = 'regular'),

round_selection as (
select 
	team,
	win,
	"date",
	womens_table,
  "group",
	sum(win_var) over (partition by team order by date) sum_wins,
	sum(draw_var) over (partition by team order by date) sum_draws,
	sum(lost_var) over (partition by team order by date) sum_lost,
	sum(goals_scored) over (partition by team order by date) sum_goals_scored,
	sum(goals_conceded) over (partition by team order by date) sum_goals_conc,
	sum(points) over (partition by team order by date) sum_points,
	sum(goal_difference) over (partition by team order by date) sum_gd,
	row_number() over (partition by team order by date) round
from win_draw_lost_values)

select 
	team,
  casual_name,
	womens_table,
	sum_wins,
	sum_draws,
	sum_lost,
	sum_goals_scored,
	sum_goals_conc,
	sum_points,
	sum_gd,
	round,
  "group",
	rank() over (partition by womens_table, "group", round order by sum_points desc, sum_gd desc, sum_goals_scored desc, team) "rank_position"
from round_selection
join teams
on teams.team_id = round_selection.team
order by team, round asc;`,
    { bind: { season_name: seasonName }, type: QueryTypes.SELECT }
  )

  if (!tabell) {
    throw new Error('No such table in the database')
  } else {
    res.json({ tabell, roundByRoundTables })
  }
})

router.post('/', async (req, res, next) => {
  const table = await Table.create(req.body)
  res.json(table)
})

router.delete('/:tableId', async (req, res, next) => {
  const table = await Table.findByPk(req.params.tableId)
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    await table.destroy()
    res.json({ message: 'table deleted' })
  }
})

router.put('/:tableId', async (req, res, next) => {
  const table = await Table.findByPk(req.params.tableId)
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    table.set(req.body)
    await table.save()
    res.json(table)
  }
})

module.exports = router
