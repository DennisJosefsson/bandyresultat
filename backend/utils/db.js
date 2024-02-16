const Sequelize = require('sequelize')
const { ELEPHANTSQL_URL, ELEPHANTSQL_URL_DEVELOPMENT } = require('./config')

let dbUrl
let mode

switch (process.env.NODE_ENV) {
  case 'development':
    dbUrl = ELEPHANTSQL_URL_DEVELOPMENT
    mode = 'development'
    break
  default:
    dbUrl = ELEPHANTSQL_URL
    mode = 'production'
}

const sequelize = new Sequelize(dbUrl, { logging: false })

const connectToDb = async () => {
  try {
    await sequelize.authenticate()

    console.log(`Connected to the ${mode} database`)
  } catch (error) {
    console.log(error)
    console.log(`Unable to connect to the ${mode} database`)
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDb, sequelize }
