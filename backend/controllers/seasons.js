const router = require('express').Router()
const { authControl } = require('../utils/middleware')

const {
  Season,
  Table,
  Team,
  Metadata,
  TeamSeason,
  Serie,
} = require('../models')

router.get('/', async (req, res, next) => {
  res.locals.origin = 'GET Seasons router'
  const seasons = await Season.findAll({
    include: { model: Metadata, attributes: ['metadataId'] },
    order: [['seasonId', 'DESC']],
  })
  res.json(seasons)
})

router.get('/:seasonId', async (req, res, next) => {
  res.locals.origin = 'GET Single Season router'
  const seasonName =
    req.params.seasonId < 1964
      ? req.params.seasonId
      : `${Number(req.params.seasonId) - 1}/${req.params.seasonId}`

  const seasonExist = await Season.count({ where: { year: seasonName } })
  if (seasonExist === 0) {
    return res.json({ success: 'false', message: 'Säsong finns inte' })
  }

  const season = await Season.findAll({
    where: { year: seasonName },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [
      { model: Team },
      { model: Table },
      { model: Metadata },
      { model: Serie },
    ],
  })
  if (!season) {
    throw new Error('No such season in the database')
  } else {
    res.json(season)
  }
})

router.post('/', authControl, async (req, res, next) => {
  res.locals.origin = 'POST Season router'
  const season = await Season.create(req.body)
  res.json(season)
})

router.post('/teamseason', authControl, async (req, res, next) => {
  res.locals.origin = 'POST Teamseason router'
  const seasonId = req.body.seasonId
  const women = req.body.women
  const teamSeasons = req.body.formState.teamArray.map((teamId) => {
    return { teamId, seasonId, women }
  })
  const teamSeasonData = await TeamSeason.bulkCreate(teamSeasons)
  res.json(teamSeasonData)
})

router.delete('/:seasonId', authControl, async (req, res, next) => {
  res.locals.origin = 'DELETE Season router'
  const season = await Season.findByPk(req.params.seasonId)
  if (!season) {
    throw new Error('No such season in the database')
  } else {
    await season.destroy()
    res.json({ message: 'season deleted' })
  }
})

router.put('/:seasonId', authControl, async (req, res, next) => {
  res.locals.origin = 'PUT Season router'
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
