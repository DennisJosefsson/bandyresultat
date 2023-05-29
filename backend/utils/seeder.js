const { sequelize } = require('./utils/db')

const seederConf = {
  migrations: {
    glob: 'seeders/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'seeders' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runSeeder = async () => {
  const seeder = new Umzug(seederConf)
  const seeders = await seeder.up()
  console.log('Seeders up to date', {
    files: seeders.map((seed) => seed.name),
  })
}
const rollbackSeeder = async () => {
  await sequelize.authenticate()
  const seeder = new Umzug(seederConf)
  await seeder.down()
}
