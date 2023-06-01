const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.changeColumn('games', 'class', {
      type: DataTypes.ENUM,
      values: ['regular', 'qualification', 'eight', 'quarter', 'semi', 'final'],
    })
  },

  down: async ({ context: queryInterface }) => {
    queryInterface.changeColumn('games', 'class', {
      type: DataTypes.STRING,
      defaultValue: 'regular',
    })
  },
}
