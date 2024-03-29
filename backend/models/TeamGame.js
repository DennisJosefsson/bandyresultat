const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class TeamGame extends Model {}
TeamGame.init(
  {
    teamGameId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gameId: {
      type: DataTypes.INTEGER,
      references: { model: 'games', key: 'gameId' },
    },
    serieId: {
      type: DataTypes.INTEGER,
      references: { model: 'series', key: 'serieId' },
    },
    team: {
      type: DataTypes.INTEGER,
      references: { model: 'teams', key: 'teamId' },
    },
    opponent: {
      type: DataTypes.INTEGER,
      references: { model: 'teams', key: 'teamId' },
    },
    seasonId: {
      type: DataTypes.INTEGER,
      references: { model: 'seasons', key: 'seasonId' },
    },
    goalsScored: {
      type: DataTypes.INTEGER,
    },
    goalsConceded: {
      type: DataTypes.INTEGER,
    },
    goalDifference: {
      type: DataTypes.INTEGER,
    },
    totalGoals: {
      type: DataTypes.INTEGER,
    },
    points: {
      type: DataTypes.INTEGER,
    },
    win: {
      type: DataTypes.BOOLEAN,
    },
    lost: {
      type: DataTypes.BOOLEAN,
    },
    draw: {
      type: DataTypes.BOOLEAN,
    },
    qualificationGame: {
      type: DataTypes.BOOLEAN,
    },
    playoff: {
      type: DataTypes.BOOLEAN,
    },
    mix: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    homeGame: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    women: {
      type: DataTypes.BOOLEAN,
    },
    category: { type: DataTypes.STRING(30) },
    group: { type: DataTypes.STRING(30) },
    date: { type: DataTypes.DATEONLY },
    played: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    currInoffChamp: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'teamgame',
  }
)

module.exports = TeamGame
