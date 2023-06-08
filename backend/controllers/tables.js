const router = require('express').Router()

const { Table, Season, Team } = require('../models')

router.get('/:seasonId', async (req, res) => {
  const table = await Table.findAll({
    where: { seasonId: req.params.seasonId },
    attributes: {
      exclude: [
        'seasonId',
        'qualification',
        'createdAt',
        'updatedAt',
        'tableId',
      ],
    },
    include: {
      model: Team,
      attributes: { exclude: ['women', 'createdAt', 'updatedAt'] },
    },
    order: [['position', 'ASC']],
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
