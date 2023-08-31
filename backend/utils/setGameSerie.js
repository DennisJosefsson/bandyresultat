const data = require('./structureFile.json')
const { Op } = require('sequelize')
const { Game, Serie } = require('../models')

const getSeriesData = async () => {
  const seriesData = await Serie.findAll({
    where: { serieId: 282 },
    raw: true,
  })

  console.log(seriesData[0].serieStructure)
}

const setGameSerie = async () => {
  try {
    await Serie.bulkCreate(data, {
      updateOnDuplicate: [
        'serieGroupCode',
        'serieCategory',
        'serieName',
        'serieStructure',
        'seasonId',
      ],
    })
  } catch (error) {
    console.log('There was an error: ', error)
  }
}

setGameSerie()

//getSeriesData()
