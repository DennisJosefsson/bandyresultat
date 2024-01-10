import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Metadata from '../models/Metadata.js'
import Season from '../models/Season.js'
import { Op } from 'sequelize'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import seasonIdCheck from '../utils/postFunctions/seasonIdCheck.js'
import newMetadataEntry from '../utils/postFunctions/newMetaDataEntry.js'
import IDCheck from '../utils/postFunctions/IDCheck.js'
const metadataRouter = Router()

metadataRouter.get('/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const metadata = await Metadata.findAll({
    where: { seasonId: req.params.seasonId },
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear } },
    },
  })

  if (!metadata || metadata.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No metadata',
      logging: false,
      context: { origin: 'GET metadata Season Router' },
    })
  } else {
    res.json(metadata)
  }
}) as RequestHandler)

metadataRouter.post('/', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const metadataEntry = newMetadataEntry(req.body)
  const metadata = await Metadata.create(metadataEntry)
  res.json(metadata)
}) as RequestHandler)

metadataRouter.delete('/:metadataId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const metadataId = IDCheck.parse(req.params.metadataId)
  const metadata = await Metadata.findOne({
    where: { metadataId: metadataId },
  })
  if (!metadata) {
    throw new NotFoundError({
      code: 404,
      message: 'No metadata',
      logging: false,
      context: { origin: 'Delete metadata Router' },
    })
  } else {
    await metadata.destroy()
    res.status(200).json({ message: 'Metadata deleted' })
  }
}) as RequestHandler)

metadataRouter.put('/:metadataId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const metadataId = IDCheck.parse(req.params.metadataId)
  const metadata = await Metadata.findOne({
    where: { metadataId: metadataId },
  })
  if (!metadata) {
    throw new NotFoundError({
      code: 404,
      message: 'No metadata',
      logging: false,
      context: { origin: 'PUT metadata Router' },
    })
  } else {
    const metadataEntry = newMetadataEntry(req.body)
    metadata.set(metadataEntry)
    await metadata.save()
    res.json(metadata)
  }
}) as RequestHandler)

export default metadataRouter
