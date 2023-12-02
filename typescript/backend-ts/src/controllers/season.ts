import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Season from '../models/Season.js'
import newSeasonEntry from '../utils/postFunctions/newSeasonEntry.js'

const seasonRouter = Router()

seasonRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const seasons = await Season.findAll()
    if (!seasons || seasons.length === 0) {
      return res.status(404).json({ message: 'No seasons' })
    }
    res.status(200).json(seasons)
  } catch (error) {
    console.log(error)
  }
}) as RequestHandler)

seasonRouter.post('/', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const newSeasonObject = newSeasonEntry(req.body)
  const newSeason = await Season.create(newSeasonObject)
  return res.json(newSeason)
}) as RequestHandler)

export default seasonRouter
