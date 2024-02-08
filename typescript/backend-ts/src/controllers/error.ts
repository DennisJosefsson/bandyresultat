import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import BandyError from '../models/BandyError.js'
import newErrorEntry from '../utils/postFunctions/newErrorEntry.js'
const errorRouter = Router()

errorRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const backendErrors = await BandyError.findAll({
    where: { backend: true },
    limit: 15,
    order: [['errorId', 'desc']],
  })
  const frontendErrors = await BandyError.findAll({
    where: { backend: false },
    limit: 15,
    order: [['errorId', 'desc']],
  })
  res.status(200).json({ backendErrors, frontendErrors })
}) as RequestHandler)

errorRouter.post('/', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST Error router'
  const errorEntry = newErrorEntry(req.body)
  const error = await BandyError.create(errorEntry)
  res.status(201).json(error)
}) as RequestHandler)

export default errorRouter
