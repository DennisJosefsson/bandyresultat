const router = require('express').Router()
const { Team, Table, Season } = require('../models')

router.get('/', async (req, res) => {
  const teams = await Team.findAll()

  console.log('teams request', new Date())
  res.json(teams)
})

router.get('/:teamId', async (req, res) => {
  const teams = await Team.findByPk(req.params.teamId, {
    include: { model: Table },
  })

  console.log('teams request', new Date())
  res.json(teams)
})

module.exports = router
