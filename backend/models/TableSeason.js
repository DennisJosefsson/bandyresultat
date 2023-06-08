const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class TableSeason extends Model {}

TableSeason.init(
  {
    tableseasonId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seasonId: {
      type: DataTypes.INTEGER,
      references: { model: 'seasons', key: 'seasonId' },
    },
    tableId: {
      type: DataTypes.INTEGER,
      references: { model: 'tables', key: 'tableId' },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'tableseason',
  }
)

module.exports = TableSeason
