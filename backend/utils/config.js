require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  LOCAL_DATABASE_URL: process.env.LOCAL_DATABASE_URL,
}
