import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Serie from '../models/Serie.js'
import newSeriesEntry, {
  updateSeriesEntry,
} from '../utils/postFunctions/newSeriesEntry.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import authControl from '../utils/middleware/authControl.js'

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

seriesRouter.post('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seriesObject = newSeriesEntry(req.body)
  const serie = await Serie.create(seriesObject)
  res.status(201).json(serie)
}) as RequestHandler)

seriesRouter.put('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const updateSerieObject = updateSeriesEntry(req.body)
  const serie = await Serie.findByPk(updateSerieObject.serieId)
  if (!serie) {
    throw new NotFoundError({
      code: 404,
      message: 'No such serie',
      logging: true,
      context: { origin: 'Update Serie Router' },
    })
  }
  const [updateSerie] = await Serie.upsert(updateSerieObject)
  return res.status(200).json(updateSerie)
}) as RequestHandler)

export default seriesRouter
