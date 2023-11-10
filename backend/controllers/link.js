const router = require('express').Router()
const { Link } = require('../models')

router.get('/:linkName', async (req, res, next) => {
  res.locals.origin = 'GET Comparelink router'
  const result = await Link.findOne({
    where: { linkName: req.params.linkName },
  })
  const searchString = JSON.parse(result.searchString)
  if (!searchString) {
    res.json({ success: false, message: 'Länk finns ej.' })
  } else {
    res.json({
      success: true,
      message: 'Länk finns.',
      searchString,
      origin: result.origin,
    })
  }
})

module.exports = router
