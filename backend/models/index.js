const Team = require('./Team')
const Season = require('./Season')
const Game = require('./Game')
const Table = require('./Table')
const Metadata = require('./Metadata')
const TeamSeason = require('./TeamSeason')

Season.hasMany(Game, { foreignKey: 'seasonId' })
Game.belongsTo(Season, { foreignKey: 'seasonId' })

Team.hasMany(Game, { foreignKey: 'gameId' })
Game.belongsTo(Team, { as: 'homeTeam', foreignKey: 'homeTeamId' })

Team.hasMany(Game, { foreignKey: 'gameId' })
Game.belongsTo(Team, { as: 'awayTeam', foreignKey: 'awayTeamId' })

Team.hasMany(Table, { foreignKey: 'teamId' })
Table.belongsTo(Team, { foreignKey: 'teamId' })

Team.belongsToMany(Season, { through: TeamSeason, foreignKey: 'teamId' })
Season.belongsToMany(Team, { through: TeamSeason, foreignKey: 'seasonId' })

Season.hasMany(Table, { foreignKey: 'seasonId' })
Table.belongsTo(Season, { foreignKey: 'seasonId' })

Season.hasOne(Metadata)
Metadata.belongsTo(Season)

module.exports = {
  Team,
  Season,
  Game,
  Table,
  Metadata,
  TeamSeason,
}
