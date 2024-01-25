import express, { Application, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import { connectToDb } from './index.js'
import { errorHandler } from './middleware/errors/errorhandler.js'
import teamRouter from '../controllers/team.js'
import seasonRouter from '../controllers/season.js'
import teamSeasonRouter from '../controllers/teamSeason.js'
import seriesRouter from '../controllers/series.js'
import gameRouter from '../controllers/games.js'
import tableRouter from '../controllers/tables.js'
import metadataRouter from '../controllers/metadata.js'
import loginRouter from '../controllers/login.js'
import teamgameRouter from '../controllers/teamGames.js'
const app: Application = express()

app.use(express.json())
app.use(cors({ credentials: true }))
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  next()
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cookieParser())

app.get('/healthcheck', (_req: Request, res: Response) => {
  res.status(200).send({ message: 'Hello world!' })
})

app.use('/api/teams', teamRouter)
app.use('/api/seasons', seasonRouter)
app.use('/api/teamSeasons', teamSeasonRouter)
app.use('/api/series', seriesRouter)
app.use('/api/games', gameRouter)
app.use('/api/tables', tableRouter)
app.use('/api/metadata', metadataRouter)
app.use('/api/login', loginRouter)
app.use('/api/teamgames', teamgameRouter)
app.use(errorHandler)

const startDB: () => Promise<void> = async () => {
  await connectToDb()
}

startDB()
  .then(() => {})
  .catch((err) => console.error(err))

export default app
