const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Metadata extends Model {}
Metadata.init(
  {
    metadataId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    seasonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'seasons', key: 'seasonId' },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    winnerId: {
      type: DataTypes.INTEGER,
      references: { model: 'teams', key: 'teamId' },
    },
    winnerName: {
      type: DataTypes.STRING,
    },
    hostCity: {
      type: DataTypes.STRING,
    },
    finalDate: {
      type: DataTypes.STRING,
    },
    northSouth: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    multipleGroupStages: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    eight: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    quarter: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    semi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    final: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'metadata',
  }
)

module.exports = Metadata
