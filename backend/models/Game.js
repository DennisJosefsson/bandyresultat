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
      type: DataTypes.ENUM([
        'regular',
        'qualification',
        'eight',
        'quarter',
        'semi',
        'final',
      ]),
      defaultValue: 'regular',
    },
    group: {
      type: DataTypes.ENUM([
        'elitserien',
        'allsvenskan',
        'norr',
        'syd',
        'KvalA',
        'KvalB',
        'E1',
        'E2',
        'Q1',
        'Q2',
        'Q3',
        'Q4',
        'S1',
        'S2',
        'final',
      ]),
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
