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
    women: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
