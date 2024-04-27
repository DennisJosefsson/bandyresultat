import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import TeamSeason from '../models/TeamSeason.js'
import Season from '../models/Season.js'
import seasonIdCheck from '../utils/postFunctions/seasonIdCheck.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
import { Op } from 'sequelize'
import teamSeasonUpsertPromise from '../utils/postFunctions/newTeamSeasonEntry.js'

const teamSeasonRouter = Router()

teamSeasonRouter.get('/:id', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.safeParse(req.params.seasonId)

  const teamSeasons = await TeamSeason.findAll({
    include: {
      model: Season,
      where: { year: { [Op.eq]: seasonYear.success && seasonYear.data } },
    },
  })
  if (!teamSeasons || teamSeasons.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No teamseasons',
      logging: false,
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
      logging: false,
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
  const parsedData = teamSeasonUpsertPromise(req.body)
  if (!parsedData.teamseasonId) {
    const teamSeasons = await TeamSeason.create(parsedData)
    return res.status(201).json(teamSeasons)
  } else {
    const teamSeasons = await TeamSeason.update(parsedData, {
      where: { teamseasonId: parsedData.teamseasonId },
    })
    return res.status(201).json(teamSeasons)
  }
}) as RequestHandler)

export default teamSeasonRouter
