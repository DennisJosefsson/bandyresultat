const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../utils/db')
const useBcrypt = require('sequelize-bcrypt')
class User extends Model {}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'users',
  }
)

useBcrypt(User, {
  field: 'password',
  rounds: 12,
  compare: 'authenticate',
})

module.exports = User
