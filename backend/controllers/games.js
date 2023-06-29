const router = require('express').Router()
const { Game, Team, Season } = require('../models')
const { sequelize } = require('../utils/db')

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
      { model: Team, attributes: ['name', 'teamId'], as: 'homeTeam' },
      { model: Team, attributes: ['name', 'teamId'], as: 'awayTeam' },
      { model: Season, attributes: ['year', 'seasonId'] },
    ],
  })
  if (!games) {
    throw new Error('No such game in the database')
  } else {
    res.json(games)
  }
})

router.get('/season/:seasonId', async (req, res, next) => {
  console.log(req.params.seasonId)
  const games = await Game.findAll({
    where: { seasonId: req.params.seasonId },
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
      { model: Team, attributes: ['name', 'teamId'], as: 'homeTeam' },
      { model: Team, attributes: ['name', 'teamId'], as: 'awayTeam' },
      { model: Season, attributes: ['year', 'seasonId'] },
    ],
    group: [
      'date',
      'game.game_id',
      'homeTeam.name',
      'homeTeam.team_id',
      'awayTeam.name',
      'awayTeam.team_id',
      'season.year',
      'season.season_id',
    ],
    order: [
      ['date', 'ASC'],
      ['group', 'ASC'],
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
      { model: Team, attributes: ['name'], as: 'homeTeam' },
      { model: Team, attributes: ['name'], as: 'awayTeam' },
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
