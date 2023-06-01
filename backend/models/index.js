const Team = require('./Team')
const Season = require('./Season')
const Game = require('./Game')
const Table = require('./Table')

Season.hasMany(Game, { foreignKey: 'seasonId' })
Game.belongsTo(Season, { foreignKey: 'seasonId' })

Team.hasMany(Game, { foreignKey: 'gameId' })
Game.belongsTo(Team, { as: 'homeTeam', foreignKey: 'homeTeamId' })

Team.hasMany(Game, { foreignKey: 'gameId' })
Game.belongsTo(Team, { as: 'awayTeam', foreignKey: 'awayTeamId' })

Team.hasMany(Table, { foreignKey: 'teamId' })
Table.belongsTo(Team, { foreignKey: 'teamId' })

Season.hasMany(Table, { foreignKey: 'seasonId' })
Table.belongsTo(Season, { foreignKey: 'seasonId' })

module.exports = {
  Team,
  Season,
  Game,
  Table,
}
