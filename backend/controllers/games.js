const router = require('express').Router()
const { Game, Team, Season } = require('../models')

router.get('/', async (req, res, next) => {
  const games = await Game.findAll({
    attributes: ['date', 'result', 'halftime_result'],
    include: [
      { model: Team, attributes: ['name'], as: 'homeTeam' },
      { model: Team, attributes: ['name'], as: 'awayTeam' },
      { model: Season, attributes: ['year'] },
    ],
  })
  if (!games) {
    throw new Error('No such game in the database')
  } else {
    res.json(games)
  }
})

router.get('/playoff/:seasonId', async (req, res, next) => {
  const games = await Game.findAll({
    where: { seasonId: req.params.seasonId, playoff: true },
    attributes: ['date', 'result', 'halftime_result'],
    include: [
      { model: Team, attributes: ['name'], as: 'homeTeam' },
      { model: Team, attributes: ['name'], as: 'awayTeam' },
      { model: Season, attributes: ['year'] },
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
  const game = await Game.create(req.body)
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
