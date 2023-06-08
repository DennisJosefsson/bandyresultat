const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('tableseasons', {
      tableseason_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'seasons', key: 'season_id' },
      },
      table_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tables', key: 'table_id' },
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('tableseasons')
  },
}
