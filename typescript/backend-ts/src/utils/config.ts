import dotenv from 'dotenv'
dotenv.config()

const config = {
  PORT: process.env.PORT || 3001,
  DATABASE_URL: process.env.DATABASE_URL,
  LOCAL_DATABASE_URL: process.env.LOCAL_DATABASE_URL,
  ELEPHANTSQL_URL: process.env.ELEPHANTSQL_URL,
  ELEPHANTSQL_URL_DEVELOPMENT: process.env.ELEPHANTSQL_URL_DEVELOPMENT,
  ELEPHANTSQL_URL_TESTING: process.env.ELEPHANTSQL_URL_TESTING,
  JWT_SECRET: process.env.JWT_SECRET,
}

export default config
