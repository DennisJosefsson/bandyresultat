const { DataTypes } = require('sequelize')

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable('seasons', {
      season_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      women: {
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

    await queryInterface.createTable('teams', {
      team_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      women: {
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

    await queryInterface.createTable('games', {
      game_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      season_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'seasons',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      home_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      away_team_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      women: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      result: {
        type: DataTypes.STRING,
      },
      home_goal: {
        type: DataTypes.INTEGER,
      },
      away_goal: {
        type: DataTypes.INTEGER,
      },
      round: {
        type: DataTypes.INTEGER,
      },
      class: {
        type: DataTypes.STRING,
        defaultValue: 'regular',
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
    await queryInterface.dropTable('games')
    await queryInterface.dropTable('teams')
    await queryInterface.dropTable('seasons')
  },
}
