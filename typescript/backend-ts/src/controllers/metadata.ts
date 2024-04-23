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
import newMetadataEntry, {
  updateMetadataEntry,
} from '../utils/postFunctions/newMetaDataEntry.js'
import IDCheck from '../utils/postFunctions/IDCheck.js'
import authControl from '../utils/middleware/authControl.js'
const metadataRouter = Router()

metadataRouter.get('/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log('seasonId ------->', req.params.seasonId)
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const metadata = await Metadata.findAll({
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
  const [metadata] = await Metadata.upsert(metadataEntry)
  res.status(201).json(metadata)
}) as RequestHandler)

metadataRouter.put('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const updateMetadataObject = updateMetadataEntry(req.body)
  const metadata = await Metadata.findByPk(updateMetadataObject.metadataId)
  if (!metadata) {
    throw new NotFoundError({
      code: 404,
      message: 'No such metadata',
      logging: false,
      context: { origin: 'Update metadata Router' },
    })
  }
  const [updateMetadata] = await Metadata.upsert(updateMetadataObject)
  return res.status(200).json(updateMetadata)
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
    res.status(204).json({ message: 'Metadata deleted' })
  }
}) as RequestHandler)

export default metadataRouter
