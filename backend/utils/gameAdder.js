const gameData202223 = require('../../json/games/202223')
const { Game } = require('../models')

const addGame = async () => {
  try {
    await Game.bulkCreate(gameData202223)
  } catch (error) {
    console.log('There was an error: ', error)
  }
}

addGame()
