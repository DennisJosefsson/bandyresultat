const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('tables', {
      table_d: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'teams', key: 'team_id' },
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'seasons', key: 'season_id' },
      },
      games: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      won: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      draw: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      lost: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      scored_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      conceded_goals: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      goal_difference: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      qualification: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('tables')
  },
}
