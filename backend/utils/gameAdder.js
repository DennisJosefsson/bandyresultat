const gameDataDam201112 = require('../../json/games/dam201112')
const { Game } = require('../models')

const addGame = async () => {
  try {
    await Game.bulkCreate(gameDataDam201112)
  } catch (error) {
    console.log('There was an error: ', error)
  }
}

addGame()
