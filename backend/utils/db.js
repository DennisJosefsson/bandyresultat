const Sequelize = require('sequelize')
const { ELEPHANTSQL_URL, ELEPHANTSQL_URL_DEVELOPMENT } = require('./config')

// För att det ska fungera med Aiven.io,
// ta bort kommentarerna så att databas-urlen
// får med sig länken till certifikatet.
// Glöm inte att ändra till rätt host.

//const path = require('node:path')

let dbUrl
let mode

// const pemPath = path.join(__dirname, '/pem/ca.pem')

// const caString = `&sslrootcert=${pemPath}`

switch (process.env.NODE_ENV) {
  case 'development':
    dbUrl = ELEPHANTSQL_URL_DEVELOPMENT // + caString
    mode = 'development'
    break
  default:
    dbUrl = ELEPHANTSQL_URL
    mode = 'production'
}

const sequelize = new Sequelize(dbUrl, {
  logging: false,
})

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
