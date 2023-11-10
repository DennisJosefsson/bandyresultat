const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')

class Link extends Model {}

Link.init(
  {
    linkId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    linkName: {
      type: DataTypes.STRING,
    },
    searchString: {
      type: DataTypes.STRING,
    },
    origin: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'links',
  }
)

module.exports = Link
