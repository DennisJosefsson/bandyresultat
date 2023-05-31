module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('teams', [
      { name: 'Villa Lidköping BK', city: 'Lidköping' },
      { name: 'Hammarby IF', city: 'Stockholm' },
      { name: 'IFK Motala', city: 'Motala' },
      { name: 'GAIS Bandy', city: 'Göteborg' },
      { name: 'Västerås SK', city: 'Västerås' },
      { name: 'Edsbyns IF', city: 'Edsbyn' },
      { name: 'Kalix BF', city: 'Kalix' },
      { name: 'Sandvikens AIK', city: 'Sandviken' },
      { name: 'IFK Vänersborg', city: 'Vänersborg' },
      { name: 'IK Sirius', city: 'Uppsala' },
      { name: 'Bollnäs GIF', city: 'Bollnäs' },
      { name: 'Vetlanda BK', city: 'Vetlanda' },
      { name: 'Broberg/Söderhamn Bandy', city: 'Söderhamn' },
      { name: 'Ljusdals BK', city: 'Ljusdal' },
      { name: 'IFK Kungälv', city: 'Kungälv' },
      { name: 'Frillesås BK', city: 'Frillesås' },
      { name: 'Nässjö IF', city: 'Nässjö' },
      { name: 'IFK Rättvik', city: 'Rättvik' },
      { name: 'Tranås BoIS', city: 'Tranås' },
      { name: 'Gripen Trollhättan BK', city: 'Trollhättan' },
      { name: 'Örebro SK', city: 'Örebro' },
    ])
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('teams')
  },
}
