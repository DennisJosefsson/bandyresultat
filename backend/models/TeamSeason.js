const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class TeamSeason extends Model {}

TeamSeason.init(
  {
    teamseasonId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seasonId: {
      type: DataTypes.INTEGER,
      references: { model: 'seasons', key: 'seasonId' },
    },
    teamId: {
      type: DataTypes.INTEGER,
      references: { model: 'teams', key: 'teamId' },
    },
    tableId: {
      type: DataTypes.INTEGER,
      references: { model: 'teams', key: 'tableId' },
    },
    qualification: {
      type: DataTypes.BOOLEAN,
    },
    women: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'teamseason',
  }
)

module.exports = TeamSeason
