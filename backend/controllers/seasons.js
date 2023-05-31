const router = require('express').Router()

const { Season } = require('../models')

router.get('/men', async (req, res) => {
  const seasons = await Season.findAll({ where: { women: false } })
  res.json(seasons)
})

router.get('/women', async (req, res) => {
  const seasons = await Season.findAll({ where: { women: true } })
  res.json(seasons)
})

module.exports = router
