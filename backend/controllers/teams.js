const router = require('express').Router()
const { Team } = require('../models')

router.get('/', async (req, res) => {
  const teams = await Team.findAll()
  res.json(teams)
})

module.exports = router
