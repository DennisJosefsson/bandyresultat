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
const seasonRouter = Router()

seasonRouter.get('/:id', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonId = seasonIdCheck(req.params.id)
  const season = await Season.findAll({
    where: { year: { [Op.eq]: seasonId } },
    include: [Team, Serie],
  })
  if (!season) {
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
