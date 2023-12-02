import dotenv from 'dotenv'
dotenv.config()
import { Sequelize } from 'sequelize-typescript'
import Error from '../models/Error.js'
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

const dbUrl: string =
  process.env.NODE_ENV === 'development'
    ? (process.env.ELEPHANTSQL_URL_DEVELOPMENT as string)
    : (process.env.ELEPHANTSQL_URL as string)

export const sequelize = new Sequelize(dbUrl, { omitNull: true })

export const connectToDb = async () => {
  try {
    sequelize.addModels([
      Error,
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

    console.log(
      `Connected to the ${
        process.env.NODE_ENV === 'development' ? 'development' : 'production'
      } database.`
    )
  } catch (error) {
    console.log(error)
    console.log(
      `Unable to connect to the ${
        process.env.NODE_ENV === 'development' ? 'development' : 'production'
      } database.`
    )
    return process.exit(1)
  }
  return null
}
