import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import TeamSeason from '../models/TeamSeason.js'
import Season from '../models/Season.js'
import newTeamSeasonEntry from '../utils/postFunctions/newTeamSeasonEntry.js'
import seasonIdCheck from '../utils/postFunctions/seasonIdCheck.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import { Op } from 'sequelize'

const teamSeasonRouter = Router()

teamSeasonRouter.get('/:id', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const season = seasonIdCheck(req.params.id)

  const teamSeasons = await TeamSeason.findAll({
    include: { model: Season, where: { year: { [Op.eq]: season } } },
  })
  if (!teamSeasons || teamSeasons.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No teamseasons',
      logging: true,
      context: { origin: 'Get Single Season Teamseasons' },
    })
  }
  res.status(200).json(teamSeasons)
}) as RequestHandler)

teamSeasonRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamSeasons = await TeamSeason.findAll()
  if (!teamSeasons || teamSeasons.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No teamseasons',
      logging: true,
      context: { origin: 'Get All Teamseasons' },
    })
  }
  res.status(200).json(teamSeasons)
}) as RequestHandler)

teamSeasonRouter.post('/', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const newTeamSeasonObject = newTeamSeasonEntry(req.body)
  const newTeamSeason = await TeamSeason.create(newTeamSeasonObject)
  return res.json(newTeamSeason)
}) as RequestHandler)

export default teamSeasonRouter
