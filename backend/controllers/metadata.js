const router = require('express').Router()
const { authControl } = require('../utils/middleware')

const { Metadata, Season } = require('../models')

router.get('/:seasonId', async (req, res, next) => {
  const metadata = await Metadata.findOne({
    where: { seasonId: req.params.seasonId },
    include: { model: Season },
  })

  if (!metadata) {
    throw new Error('No such metadata in the database')
  } else {
    res.json(metadata)
  }
})

router.post('/', authControl, async (req, res, next) => {
  const metadata = await Metadata.create(req.body)
  res.json(metadata)
})

router.delete('/:metadataId', authControl, async (req, res, next) => {
  const metadata = await Metadata.findByPk(req.params.metadataId)
  if (!metadata) {
    throw new Error('No such metadata in the database')
  } else {
    await metadata.destroy()
    res.json({ message: 'Metadata deleted' })
  }
})

router.put('/:metadataId', authControl, async (req, res, next) => {
  const metadata = await Metadata.findByPk(req.params.metadataId)
  if (!metadata) {
    throw new Error('No such metadata in the database')
  } else {
    metadata.set(req.body)
    await metadata.save()
    res.json(metadata)
  }
})

module.exports = router
