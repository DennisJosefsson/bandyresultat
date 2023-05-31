const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Season extends Model {}

Season.init(
  {
    seasonId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: 'season',
  }
)

module.exports = Season
