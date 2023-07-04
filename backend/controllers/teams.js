const router = require('express').Router()
const { Op, Model } = require('sequelize')
const { sequelize } = require('../utils/db')
const { Team, Table, Season, TeamSeason } = require('../models')

router.get('/', async (req, res) => {
  const teams = await Team.findAll({
    order: [['casualName', 'ASC']],
  })

  console.log('teams request', new Date())
  res.json(teams)
})

router.get('/latest', async (req, res) => {
  let women = false
  const teams = await TeamSeason.findAll({
    where: {
      seasonId: [
        sequelize.literal(
          `SELECT MAX("season_id") FROM "teamseasons" WHERE "women" = $women`
        ),
      ],
    },
    bind: { women },
  })

  console.log('teams request', new Date())
  res.json(teams)
})

router.get('/:teamId', async (req, res) => {
  const team = await Team.findByPk(req.params.teamId, {
    include: {
      model: Season,
      attributes: ['year', 'seasonId'],
      through: {
        attributes: [],
      },
    },
  })

  console.log('teams request', new Date())
  if (!team) {
    throw new Error('No such team in the database')
  } else {
    team.set(req.body)
    await team.save()
    res.json(team)
  }
})

router.post('/', async (req, res, next) => {
  console.log(req.body)
  const team = await Team.create(req.body)
  res.json(team)
})

router.delete('/:teamId', async (req, res, next) => {
  const team = await Team.findByPk(req.params.teamId)
  if (!team) {
    throw new Error('No such team in the database')
  } else {
    await team.destroy()
    res.json({ message: 'team deleted' })
  }
})

router.put('/:teamId', async (req, res, next) => {
  const team = await Team.findByPk(req.params.teamId)
  if (!team) {
    throw new Error('No such team in the database')
  } else {
    team.set(req.body)
    await team.save()
    res.json(team)
  }
})

module.exports = router
