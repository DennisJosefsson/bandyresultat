const elitseriendam2324 = require('../../json/games/elitseriendam2324')
const { Game } = require('../models')

const addGame = async () => {
  try {
    await Game.bulkCreate(elitseriendam2324)
  } catch (error) {
    console.log('There was an error: ', error)
  }
}

addGame()
