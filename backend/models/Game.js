const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Game extends Model {}

Game.init(
  {
    result: {
      type: DataTypes.STRING,
    },
    homeGoal: {
      type: DataTypes.INTEGER,
    },
    awayGoal: {
      type: DataTypes.INTEGER,
    },
    date: {
      type: DataTypes.DATEONLY,
    },
    round: {
      type: DataTypes.INTEGER,
    },
    class: {
      type: DataTypes.STRING,
      defaultValue: 'regular',
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
