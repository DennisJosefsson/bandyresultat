const Team = require('./Team')
const Season = require('./Season')
const Game = require('./Game')

Season.hasMany(Game, { foreignKey: 'seasonId' })
Game.belongsTo(Season, { foreignKey: 'seasonId' })

Team.hasMany(Game, { foreignKey: 'gameId' })
Game.belongsTo(Team, { as: 'homeTeam', foreignKey: 'awayTeamId' })

Team.hasMany(Game, { foreignKey: 'gameId' })
Game.belongsTo(Team, { as: 'awayTeam', foreignKey: 'homeTeamId' })

module.exports = {
  Team,
  Season,
  Game,
}
