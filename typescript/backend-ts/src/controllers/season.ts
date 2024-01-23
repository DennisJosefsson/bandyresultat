import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Season from '../models/Season.js'
import newSeasonEntry from '../utils/postFunctions/newSeasonEntry.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import seasonIdCheck from '../utils/postFunctions/seasonIdCheck.js'
import { Op } from 'sequelize'
import Team from '../models/Team.js'
import Serie from '../models/Serie.js'
import IDCheck from '../utils/postFunctions/IDCheck.js'
import authControl from '../utils/middleware/authControl.js'

const seasonRouter = Router()

seasonRouter.get('/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)

  const season = await Season.findAll({
    where: { year: { [Op.eq]: seasonYear } },
    include: [Team, Serie],
    order: [['seasonId', 'asc']],
  })
  console.log(season)
  if (!season || season.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No such season',
      logging: true,
      context: { origin: 'GET Single Season Router' },
    })
  }
  res.status(200).json(season)
}) as RequestHandler)

seasonRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasons = await Season.findAll()
  if (!seasons || seasons.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No seasons',
      logging: true,
      context: { origin: 'GET All Seasons Router' },
    })
  }
  res.status(200).json(seasons)
}) as RequestHandler)

seasonRouter.post('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const newSeasonObject = newSeasonEntry(req.body)
  const [newSeason] = await Season.upsert(newSeasonObject)
  return res.status(201).json(newSeason)
}) as RequestHandler)

seasonRouter.delete('/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonId = IDCheck.parse(req.params.seasonId)
  const season = await Season.findByPk(seasonId)
  if (!season) {
    throw new NotFoundError({
      code: 404,
      message: 'No season',
      logging: false,
      context: { origin: 'Delete season Router' },
    })
  } else {
    await season.destroy()
    res.status(200).json({ message: 'Season deleted' })
  }
}) as RequestHandler)

export default seasonRouter
