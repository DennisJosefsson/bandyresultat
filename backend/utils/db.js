const Sequelize = require('sequelize')
const { DATABASE_URL } = require('./config')
const { Umzug, SequelizeStorage } = require('umzug')

const sequelize = new Sequelize(DATABASE_URL)

const connectToDb = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    await runSeeder()
    console.log('Connected to the database')
  } catch (error) {
    console.log(error)
    console.log('Unable to connect to the database')
    return process.exit(1)
  }
  return null
}

const migrationConf = {
  migrations: {
    glob: 'migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}
const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
}

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

module.exports = { connectToDb, sequelize, rollbackMigration }
