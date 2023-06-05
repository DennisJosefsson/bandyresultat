const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('metadata', {
      metadata_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'seasons', key: 'season_id' },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      winner_id: {
        type: DataTypes.INTEGER,
        references: { model: 'teams', key: 'team_id' },
      },
      winner_name: {
        type: DataTypes.STRING,
      },
      host_city: {
        type: DataTypes.STRING,
      },
      final_Date: {
        type: DataTypes.STRING,
      },
      north_south: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      multiple_group_stages: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      eight: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      quarter: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      semi: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      final: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      comment: {
        type: DataTypes.TEXT,
      },
    })

    await queryInterface.addColumn('games', 'halftime_result', {
      type: DataTypes.STRING,
    })
    await queryInterface.addColumn('games', 'halftime_home_goal', {
      type: DataTypes.INTEGER,
    })
    await queryInterface.addColumn('games', 'halftime_away_goal', {
      type: DataTypes.INTEGER,
    })
    await queryInterface.addColumn('games', 'playoff', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    })
    await queryInterface.addColumn('games', 'extra_time', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    })
    await queryInterface.addColumn('games', 'penalties', {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    })
    await queryInterface.addColumn('tables', 'group', {
      type: DataTypes.ENUM,
      values: ['elitserien', 'allsvenskan', 'norr', 'syd', 'KvalA', 'KvalB'],
      defaultValue: 'elitserien',
    })
    await queryInterface.addColumn('games', 'group', {
      type: DataTypes.ENUM,
      values: [
        'elitserien',
        'allsvenskan',
        'norr',
        'syd',
        'KvalA',
        'KvalB',
        'E1',
        'E2',
        'Q1',
        'Q2',
        'Q3',
        'Q4',
        'S1',
        'S2',
      ],
      defaultValue: 'elitserien',
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable('metadata')
    await queryInterface.removeColumn('games', 'halftime_result')
    await queryInterface.removeColumn('games', 'halftime_home_goal')
    await queryInterface.removeColumn('games', 'halftime_away_goal')
    await queryInterface.removeColumn('games', 'playoff')
    await queryInterface.removeColumn('games', 'extra_time')
    await queryInterface.removeColumn('games', 'penalties')
  },
}
