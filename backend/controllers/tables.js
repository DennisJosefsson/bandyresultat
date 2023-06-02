const router = require('express').Router()

const { Table, Season, Team } = require('../models')

router.get('/:seasonId/men', async (req, res) => {
  const table = await Table.findAll({
    where: { seasonId: req.params.seasonId, women: false },
    order: [['position', 'asc']],
    attributes: {
      exclude: ['qualification', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId'],
      },
      { model: Season, attributes: ['year'] },
    ],
  })
  console.log(new Date())
  res.json(table)
})

router.get('/:seasonId/women', async (req, res) => {
  const table = await Table.findAll({
    where: { seasonId: req.params.seasonId, women: true },
    attributes: {
      exclude: [
        'seasonId',
        'qualification',
        'createdAt',
        'updatedAt',
        'tableId',
        'teamId',
      ],
    },
    include: [
      { model: Season, attributes: ['year', 'seasonId'] },
      { model: Team, attributes: ['name', 'teamId'] },
    ],
  })
  res.json(table)
})

router.get('/:tableId', async (req, res) => {
  const table = await Table.findByPk(req.params.tableId, {
    attributes: {
      exclude: ['qualification', 'createdAt', 'updatedAt'],
    },
    include: [
      {
        model: Team,
        attributes: ['name', 'teamId'],
      },
      { model: Season, attributes: ['year'] },
    ],
  })
  console.log(new Date())
  res.json(table)
})

module.exports = router
