const router = require('express').Router()
const { Game, Team, Season } = require('../models')

router.get('/', async (req, res) => {
  const games = await Game.findAll({
    attributes: ['date', 'result'],
    include: [
      { model: Team, attributes: ['name'], as: 'homeTeam' },
      { model: Team, attributes: ['name'], as: 'awayTeam' },
      { model: Season, attributes: ['year'] },
    ],
  })
  res.json(games)
})

router.get('/:gameId', async (req, res) => {
  const game = await Game.findByPk(req.params.gameId, {
    attributes: ['date', 'result'],
    include: [
      { model: Team, attributes: ['name'], as: 'homeTeam' },
      { model: Team, attributes: ['name'], as: 'awayTeam' },
      { model: Season, attributes: ['year'] },
    ],
  })
  res.json(game)
})

module.exports = router
