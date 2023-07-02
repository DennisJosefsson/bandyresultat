const router = require('express').Router()
const { sequelize } = require('../utils/db')
const { Op } = require('sequelize')
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
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
    ],
    group: [
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
    ],
    order: [
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })
  res.json(maratonTabell)
})

router.get('/compare', async (req, res) => {
  const array = [1, 5, 8]
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
    ],
    group: [
      'team',
      'opponent',
      'category',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
    ],
    order: [
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })
  res.json(tabeller)
})

router.get('/:seasonId', async (req, res) => {
  const tabell = await TeamGame.findAll({
    where: { seasonId: req.params.seasonId },
    attributes: [
      'team',
      'group',
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
    ],
    group: [
      'group',
      'team',
      'lag.name',
      'lag.team_id',
      'lag.casual_name',
      'lag.short_name',
      'category',
    ],
    order: [
      ['group', 'DESC'],
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })

  if (!tabell) {
    throw new Error('No such table in the database')
  } else {
    res.json(tabell)
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
