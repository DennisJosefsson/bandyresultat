const gameDataMenKval9596 = require('../../json/menkval9596')
const { Game } = require('../models')

const addGame = async () => {
  try {
    await Game.bulkCreate(gameDataMenKval9596)
  } catch (error) {
    console.log('There was an error: ', error)
  }
}

addGame()
