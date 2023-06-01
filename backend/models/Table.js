const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Table extends Model {}
Table.init(
  {
    tableId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'teams', key: 'teamId' },
    },
    seasonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'seasons', key: 'seasonId' },
    },
    position: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    games: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    won: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    draw: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    scoredGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    concededGoals: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    goalDifference: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    qualification: {
      type: DataTypes.INTEGER,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'table',
  }
)

module.exports = Table
