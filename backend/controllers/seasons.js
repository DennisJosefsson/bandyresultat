const router = require('express').Router()

const { Season, Table, Team } = require('../models')

router.get('/men', async (req, res, next) => {
  const seasons = await Season.findAll({ where: { women: false } })
  res.json(seasons)
})

router.get('/women', async (req, res, next) => {
  const seasons = await Season.findAll({ where: { women: true } })
  res.json(seasons)
})

router.get('/:seasonId', async (req, res, next) => {
  const season = await Season.findByPk(req.params.seasonId, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
      model: Table,
      attributes: {
        exclude: [
          'createdAt',
          'updatedAt',
          'qualification',
          'tableId',
          'teamId',
          'seasonId',
        ],
      },
      include: {
        model: Team,
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'teamId'],
        },
      },
    },
  })
  if (!season) {
    throw new Error('No such season in the database')
  } else {
    res.json(season)
  }
})

router.post('/', async (req, res, next) => {
  const season = await Season.create(req.body)
  res.json(season)
})

router.delete('/:seasonId', async (req, res, next) => {
  const season = await Season.findByPk(req.params.seasonId)
  if (!season) {
    throw new Error('No such season in the database')
  } else {
    await season.destroy()
    res.json({ message: 'season deleted' })
  }
})

router.put('/:seasonId', async (req, res, next) => {
  const season = await Season.findByPk(req.params.seasonId)
  if (!season) {
    throw new Error('No such season in the database')
  } else {
    season.set(req.body)
    await season.save()
    res.json(season)
  }
})

module.exports = router
