const { Team } = require('./Team')
const { Season } = require('./Season')
const { Game } = require('./Game')

Season.hasMany(Game, { foreignKey: 'seasonId' })
Game.belongsTo(Season, { foreignKey: 'seasonId' })

Team.hasMany(Game, { foreignKey: 'homeTeamId' })
Game.belongsTo(Team, { as: 'homeTeam', foreignKey: 'homeTeamId' })

Team.hasMany(Game, { foreignKey: 'awayTeamId' })
Game.belongsTo(Team, { as: 'awayTeam', foreignKey: 'awayTeamId' })

module.exports = {
  Team,
  Season,
  Game,
}
