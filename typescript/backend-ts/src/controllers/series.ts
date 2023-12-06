import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Serie from '../models/Serie.js'
import newSeriesEntry from '../utils/postFunctions/newSeriesEntry.js'

const seriesRouter = Router()

seriesRouter.post('/', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seriesObject = newSeriesEntry(req.body)
  const serie = await Serie.create(seriesObject)
  res.status(200).json(serie)
}) as RequestHandler)

export default seriesRouter
