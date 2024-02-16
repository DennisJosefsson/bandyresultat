import express, { Application, NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import 'express-async-errors'
import cookieParser from 'cookie-parser'
import { connectToDb } from './index.js'
import { errorHandler } from './middleware/errors/errorhandler.js'
import { routeArray } from './routes.js'

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
  console.log('Mode:', process.env.NODE_ENV)
  res.status(200).send({ message: 'Hello world!' })
})

routeArray.forEach((route) => app.use(route.path, route.router))
app.use(errorHandler)

const startDB: () => Promise<void> = async () => {
  await connectToDb()
}

startDB()
  .then(() => {})
  .catch((err) => console.error(err))

export default app
