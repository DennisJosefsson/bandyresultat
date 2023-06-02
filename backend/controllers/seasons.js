const router = require('express').Router()

const { Season, Table, Team } = require('../models')

router.get('/men', async (req, res) => {
  const seasons = await Season.findAll({ where: { women: false } })
  res.json(seasons)
})

router.get('/women', async (req, res) => {
  const seasons = await Season.findAll({ where: { women: true } })
  res.json(seasons)
})

router.get('/:seasonId', async (req, res) => {
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
  res.json(season)
})

module.exports = router
