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
    group: ['team'],
    order: [
      ['total_points', 'DESC'],
      ['total_goal_difference', 'DESC'],
      ['total_goals_scored', 'DESC'],
    ],
  })
  res.json(maratonTabell)
})

router.get('/:seasonId', async (req, res) => {
  const table = await Table.findAll({
    where: { seasonId: req.params.seasonId },
    attributes: {
      exclude: [
        'seasonId',
        'qualification',
        'createdAt',
        'updatedAt',
        'tableId',
      ],
    },
    include: {
      model: Team,
      attributes: { exclude: ['women', 'createdAt', 'updatedAt'] },
    },
    order: [['position', 'ASC']],
  })
  console.log(new Date())
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    res.json(table)
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
