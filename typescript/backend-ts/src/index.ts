import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import { config, connectToDb } from './utils/index.js'
import { errorHandler } from './utils/middleware/errors/errorhandler.js'
import teamRouter from './controllers/team.js'
import seasonRouter from './controllers/season.js'
import teamSeasonRouter from './controllers/teamSeason.js'
import seriesRouter from './controllers/series.js'
import gameRouter from './controllers/games.js'
import tableRouter from './controllers/tables.js'
import metadataRouter from './controllers/metadata.js'
const app = express()
const PORT = config['PORT']

app.use(express.json())
app.use(cors({ credentials: true }))
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  next()
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cookieParser())

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send({ message: 'Hello world!' })
})

app.use('/api/teams', teamRouter)
app.use('/api/seasons', seasonRouter)
app.use('/api/teamSeasons', teamSeasonRouter)
app.use('/api/series', seriesRouter)
app.use('/api/games', gameRouter)
app.use('/api/tables', tableRouter)
app.use('/api/metadata', metadataRouter)
app.use(errorHandler)

const start: () => Promise<void> = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log('-------------------------------')
    console.log(`Server running on port ${PORT}`)
    console.log(new Date())
    console.log('-------------------------------')
  })
}

start()
  .then(() => {})
  .catch((err) => console.error(err))
