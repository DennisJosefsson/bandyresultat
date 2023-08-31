const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Serie extends Model {}

Serie.init(
  {
    serieId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serieGroupCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serieCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    serieName: {
      type: DataTypes.STRING,
    },
    serieStructure: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    seasonId: {
      type: DataTypes.INTEGER,
      references: { model: 'seasons', key: 'seasonId' },
    },
    bonusPoints: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'serie',
  }
)

module.exports = Serie
