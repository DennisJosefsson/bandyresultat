const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Team extends Model {}

Team.init(
  {
    teamId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    casualName: {
      type: DataTypes.STRING,
    },
    shortName: {
      type: DataTypes.STRING,
    },
    women: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lat: {
      type: DataTypes.FLOAT,
    },
    long: {
      type: DataTypes.FLOAT,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'team',
  }
)

module.exports = Team
