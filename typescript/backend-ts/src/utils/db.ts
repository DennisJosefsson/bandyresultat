import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize-typescript'
import BandyError from '../models/BandyError.js'
import Game from '../models/Game.js'
import Link from '../models/Link.js'
import Metadata from '../models/Metadata.js'
import Season from '../models/Season.js'
import Serie from '../models/Serie.js'
import TableSeason from '../models/TableSeason.js'
import Team from '../models/Team.js'
import TeamGame from '../models/TeamGame.js'
import TeamSeason from '../models/TeamSeason.js'
import TeamTable from '../models/TeamTable.js'
import User from '../models/User.js'

let dbUrl: string
let mode: string
switch (process.env.NODE_ENV) {
  case 'development':
    dbUrl = process.env.ELEPHANTSQL_URL_DEVELOPMENT as string
    mode = 'development'
    break
  case 'test':
    dbUrl = process.env.ELEPHANTSQL_URL_TESTING as string
    mode = 'test'
    break
  default:
    dbUrl = process.env.ELEPHANTSQL_URL as string
    mode = 'production'
}

export const sequelize = new Sequelize(dbUrl, {
  omitNull: true,
  attributeBehavior: 'escape',
})

export const connectToDb = async () => {
  try {
    sequelize.addModels([
      BandyError,
      Season,
      Game,
      Team,
      TeamGame,
      TeamSeason,
      TeamTable,
      TableSeason,
      Serie,
      Metadata,
      User,
      Link,
    ])
    await sequelize.authenticate()

    console.log(`Connected to the ${mode} database.`)
  } catch (error) {
    console.log(error)
    console.log(`Unable to connect to the ${mode} database.`)
    return process.exit(1)
  }
  return null
}
