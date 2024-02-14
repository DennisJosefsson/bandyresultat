import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import { link, resultObject } from '../utils/postFunctions/linkNameCheck.js'
import Link from '../models/Link.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
const linkRouter = Router()

linkRouter.get('/:linkName', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'GET Link router'
  const linkName = link.parse(req.params.linkName)
  const result = await Link.findOne({
    where: { linkName: linkName },
  })
  if (!result) {
    throw new NotFoundError({
      code: 404,
      message: 'Länk finns ej',
      logging: false,
      context: { origin: 'GET Link router' },
    })
  }

  const object = resultObject.parse(result)
  const searchString = JSON.parse(object.searchString) as unknown

  res.status(200).json({
    success: true,
    message: 'Länk finns.',
    searchString,
    origin: object.origin,
  })
}) as RequestHandler)

export default linkRouter
