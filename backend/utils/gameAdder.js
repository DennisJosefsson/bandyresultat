const gameDataDam198990 = require('../../json/games/dam198990')
const { Game } = require('../models')

const addGame = async () => {
  try {
    await Game.bulkCreate(gameDataDam198990)
  } catch (error) {
    console.log('There was an error: ', error)
  }
}

addGame()
