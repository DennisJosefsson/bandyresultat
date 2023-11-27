import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { config, connectToDb } from './utils/index.js'
import teamRouter from './controllers/team.js'
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
