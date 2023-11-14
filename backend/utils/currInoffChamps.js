const { Op } = require('sequelize')
const { TeamGame } = require('../models')

let currChamp = 134

const getGames = async () => {
  const games = await TeamGame.findAll({
    where: { date: { [Op.gt]: '2000-03-18' }, women: true },
    raw: true,
    order: [['date', 'asc']],
  })

  games.forEach((game) => {
    if (game.team === currChamp && game.lost === true) {
      TeamGame.update(
        { currInoffChamp: true },
        {
          where: {
            team: game.opponent,
            gameId: game.gameId,
          },
        }
      )
      currChamp = game.opponent
    }
  })
}

getGames()
