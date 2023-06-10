const router = require('express').Router()

const { Season, Table, Team, Metadata, TeamSeason } = require('../models')

router.get('', async (req, res, next) => {
  const seasons = await Season.findAll({
    include: { model: Metadata, attributes: ['metadataId'] },
    order: [['seasonId', 'DESC']],
  })
  res.json(seasons)
})

router.get('/:seasonId', async (req, res, next) => {
  const season = await Season.findByPk(req.params.seasonId, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [{ model: Team }, { model: Table }, { model: Metadata }],
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

router.post('/teamseason', async (req, res, next) => {
  const seasonId = req.body.seasonId
  const teamSeasons = req.body.formState.map((teamId) => {
    return { teamId, seasonId }
  })
  const teamSeasonData = await TeamSeason.bulkCreate(teamSeasons)
  res.json(teamSeasonData)
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
