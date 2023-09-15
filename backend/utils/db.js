const Sequelize = require('sequelize')
const { ELEPHANTSQL_URL } = require('./config')

const sequelize = new Sequelize(ELEPHANTSQL_URL, { logging: false })

const connectToDb = async () => {
  try {
    await sequelize.authenticate()

    console.log('Connected to the database')
  } catch (error) {
    console.log(error)
    console.log('Unable to connect to the database')
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDb, sequelize }
