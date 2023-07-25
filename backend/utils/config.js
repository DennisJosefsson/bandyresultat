require('dotenv').config()

module.exports = {
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  LOCAL_DATABASE_URL: process.env.LOCAL_DATABASE_URL,
  ELEPHANTSQL_URL: process.env.ELEPHANTSQL_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
}
