import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Serie from '../models/Serie.js'
import newSeriesEntry from '../utils/postFunctions/newSeriesEntry.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'

const seriesRouter = Router()

seriesRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const series = await Serie.findAll()
  if (!series || series.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No series',
      logging: true,
      context: { origin: 'GET All series Router' },
    })
  }
  res.status(200).json(series)
}) as RequestHandler)

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
