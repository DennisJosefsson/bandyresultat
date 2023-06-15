const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('teamgames', {
      team_game_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      game_id: {
        type: DataTypes.INTEGER,
        references: { model: 'games', key: 'game_id' },
      },
      team: {
        type: DataTypes.INTEGER,
        references: { model: 'teams', key: 'team_id' },
      },
      opponent: {
        type: DataTypes.INTEGER,
        references: { model: 'teams', key: 'team_id' },
      },
      goals_scored: {
        type: DataTypes.INTEGER,
      },
      goals_conceded: {
        type: DataTypes.INTEGER,
      },
      goal_difference: {
        type: DataTypes.INTEGER,
      },
      points: {
        type: DataTypes.INTEGER,
      },
      win: {
        type: DataTypes.BOOLEAN,
      },
      lost: {
        type: DataTypes.BOOLEAN,
      },
      draw: {
        type: DataTypes.BOOLEAN,
      },
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('teamgames')
  },
}
