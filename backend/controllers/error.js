const router = require('express').Router()
const { Error } = require('../models')

router.get('/', async (req, res, next) => {
  const backendErrors = await Error.findAll({
    where: { backend: true },
    limit: 15,
    order: [['errorId', 'desc']],
  })
  const frontendErrors = await Error.findAll({
    where: { backend: false },
    limit: 15,
    order: [['errorId', 'desc']],
  })
  res.json({ backendErrors, frontendErrors })
})

router.post('/', async (req, res, next) => {
  res.locals.origin = 'POST Error router'
  const error = await Error.create(req.body)
  res.json(error)
})

module.exports = router
