const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Game extends Model {}

Game.init(
  {
    gameId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seasonId: {
      type: DataTypes.INTEGER,
      references: { model: 'seasons', key: 'seasonId' },
    },
    serieId: {
      type: DataTypes.INTEGER,
      references: { model: 'series', key: 'serieId' },
    },
    homeTeamId: {
      type: DataTypes.INTEGER,
      references: { model: 'teams', key: 'teamId' },
    },
    awayTeamId: {
      type: DataTypes.INTEGER,
      references: { model: 'teams', key: 'teamId' },
    },
    result: {
      type: DataTypes.STRING,
    },
    halftimeResult: {
      type: DataTypes.STRING,
    },
    homeGoal: {
      type: DataTypes.INTEGER,
    },
    awayGoal: {
      type: DataTypes.INTEGER,
    },
    halftimeHomeGoal: {
      type: DataTypes.INTEGER,
    },
    halftimeAwayGoal: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    round: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: 'regular',
    },
    group: {
      type: DataTypes.STRING,
      defaultValue: 'elitserien',
    },

    playoff: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    extraTime: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    penalties: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mix: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    women: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'game',
  }
)

module.exports = Game
