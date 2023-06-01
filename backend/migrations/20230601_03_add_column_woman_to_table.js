const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addColumn('tables', 'women', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    })
  },

  down: async ({ context: queryInterface }) => {
    queryInterface.removeColumn('tables', 'women')
  },
}
