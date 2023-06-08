module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('teamseasons', [
      {
        season_id: 108,
        team_id: 2,
      },
      {
        season_id: 108,
        team_id: 3,
      },
      {
        season_id: 108,
        team_id: 4,
      },
      {
        season_id: 108,
        team_id: 5,
      },
      {
        season_id: 108,
        team_id: 6,
      },
      {
        season_id: 108,
        team_id: 7,
      },
      {
        season_id: 108,
        team_id: 8,
      },
      {
        season_id: 108,
        team_id: 9,
      },
      {
        season_id: 108,
        team_id: 10,
      },
      {
        season_id: 108,
        team_id: 11,
      },
      {
        season_id: 108,
        team_id: 12,
      },
      {
        season_id: 108,
        team_id: 13,
      },
      {
        season_id: 108,
        team_id: 14,
      },
      {
        season_id: 108,
        team_id: 15,
      },
      {
        season_id: 108,
        team_id: 17,
      },
      {
        season_id: 108,
        team_id: 20,
      },
      {
        season_id: 108,
        team_id: 22,
      },
      {
        season_id: 108,
        team_id: 23,
      },
    ])
    await queryInterface.bulkInsert('tableseasons', [
      {
        season_id: 108,
        table_id: 1,
      },
      {
        season_id: 108,
        table_id: 2,
      },
      {
        season_id: 108,
        table_id: 3,
      },
      {
        season_id: 108,
        table_id: 4,
      },
      {
        season_id: 108,
        table_id: 5,
      },
      {
        season_id: 108,
        table_id: 6,
      },
      {
        season_id: 108,
        table_id: 7,
      },
      {
        season_id: 108,
        table_id: 8,
      },
      {
        season_id: 108,
        table_id: 9,
      },
      {
        season_id: 108,
        table_id: 10,
      },
      {
        season_id: 108,
        table_id: 11,
      },
      {
        season_id: 108,
        table_id: 12,
      },
      {
        season_id: 108,
        table_id: 13,
      },
      {
        season_id: 108,
        table_id: 14,
      },
    ])
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('teamseasons')
    await queryInterface.bulkDelete('tableseasons')
  },
}
