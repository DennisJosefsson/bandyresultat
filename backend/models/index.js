const Team = require('./Team')
const Season = require('./Season')
const Game = require('./Game')
const Table = require('./Table')
const Metadata = require('./Metadata')
const TeamSeason = require('./TeamSeason')
const TableSeason = require('./TeamSeason')
const TeamGame = require('./TeamGame')
const User = require('./User')

Season.hasMany(Game, { foreignKey: 'seasonId' })
Game.belongsTo(Season, { foreignKey: 'seasonId' })

Team.hasMany(Game, { foreignKey: 'gameId' })
Game.belongsTo(Team, { as: 'homeTeam', foreignKey: 'homeTeamId' })

Team.hasMany(Game, { foreignKey: 'gameId' })
Game.belongsTo(Team, { as: 'awayTeam', foreignKey: 'awayTeamId' })

Team.hasMany(TeamGame, { foreignKey: 'teamGameId' })
TeamGame.belongsTo(Team, { as: 'lag', foreignKey: 'team' })

Team.hasMany(TeamGame, { foreignKey: 'teamGameId' })
TeamGame.belongsTo(Team, { as: 'opp', foreignKey: 'opponent' })

Season.hasMany(TeamGame, { foreignKey: 'seasonId' })
TeamGame.belongsTo(Season, { foreignKey: 'seasonId' })

Team.hasMany(Table, { foreignKey: 'teamId' })
Table.belongsTo(Team, { foreignKey: 'teamId' })

Team.belongsToMany(Season, {
  through: TeamSeason,
  foreignKey: 'teamId',
  as: 'seasonteam',
})
Season.belongsToMany(Team, { through: TeamSeason, foreignKey: 'seasonId' })

Table.belongsToMany(Season, { through: TableSeason, foreignKey: 'tableId' })
Season.belongsToMany(Table, { through: TableSeason, foreignKey: 'seasonId' })

Season.hasOne(Metadata, { foreignKey: 'seasonId' })
Metadata.belongsTo(Season, { foreignKey: 'seasonId' })

module.exports = {
  Team,
  Season,
  Game,
  Table,
  Metadata,
  TeamSeason,
  TableSeason,
  TeamGame,
  User,
}
