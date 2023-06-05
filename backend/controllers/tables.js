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
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    res.json(table)
  }
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
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    res.json(table)
  }
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
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    res.json(table)
  }
})

router.post('/', async (req, res, next) => {
  const table = await Table.create(req.body)
  res.json(table)
})

router.delete('/:tableId', async (req, res, next) => {
  const table = await Table.findByPk(req.params.tableId)
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    await table.destroy()
    res.json({ message: 'table deleted' })
  }
})

router.put('/:tableId', async (req, res, next) => {
  const table = await Table.findByPk(req.params.tableId)
  if (!table) {
    throw new Error('No such table in the database')
  } else {
    table.set(req.body)
    await table.save()
    res.json(table)
  }
})

module.exports = router
