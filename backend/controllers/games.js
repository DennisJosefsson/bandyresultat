const router = require('express').Router()
const { Game, Team } = require('../models')

router.get('/', async (req, res) => {
  const games = await Game.findAll({
    include: [
      { model: Team, attributes: ['name'], as: 'homeTeam' },
      { model: Team, attributes: ['name'], as: 'awayTeam' },
    ],
  })
  res.json(games)
})

module.exports = router
