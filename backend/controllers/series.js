const router = require('express').Router()
const { Serie, Season } = require('../models')
const { authControl } = require('../utils/middleware')

router.get('/:seasonId', async (req, res, next) => {
  res.locals.origin = 'GET Season Series router'
  const series = await Serie.findAll({
    where: { seasonId: req.params.seasonId },
  })
  res.json(series)
})

router.post('/', authControl, async (req, res, next) => {
  res.locals.origin = 'POST Series router'
  const seasonName =
    req.body.season < 1964
      ? req.body.season
      : `${Number(req.body.season) - 1}/${req.body.season}`

  const season = await Season.findOne({
    where: { year: seasonName, women: req.body.women },
  })
  if (!season) {
    return res.json({ success: false, message: 'Säsong finns inte' })
  }

  const [newSerie, created] = await Serie.upsert({
    ...req.body,
    seasonId: season.seasonId,
  })
  res.json(newSerie)
})

router.delete('/:serieId', authControl, async (req, res, next) => {
  res.locals.origin = 'DELETE Series router'
  const deletedSerie = Serie.findByPk(req.params.serieId)
  if (!deletedSerie) {
    throw new Error('Finns ingen sådan serie')
  } else {
    await deletedSerie.destroy()
    res.json({ message: 'Serie borttagen' })
  }
})

module.exports = router
