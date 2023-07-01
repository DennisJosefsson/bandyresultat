const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('teams', 'casual_name', {
      type: DataTypes.STRING,
    })
    await queryInterface.addColumn('teams', 'short_name', {
      type: DataTypes.STRING,
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('teams', 'casual_name')
    await queryInterface.removeColumn('teams', 'short_name')
  },
}
