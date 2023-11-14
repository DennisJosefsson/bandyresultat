const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Error extends Model {}

Error.init(
  {
    errorId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
    origin: {
      type: DataTypes.STRING,
    },
    body: {
      type: DataTypes.STRING,
    },
    production: {
      type: DataTypes.BOOLEAN,
    },
    backend: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'error',
  }
)

module.exports = Error
