import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import seasonIdCheck from '../utils/postFunctions/seasonIdCheck.js'
import TeamGame from '../models/TeamGame.js'
import Team from '../models/Team.js'
import Season from '../models/Season.js'
import { Op } from 'sequelize'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'

const teamgameRouter = Router()

teamgameRouter.get('/season/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const seasonYear = seasonIdCheck.parse(req.params.seasonId)
  const teamgames = await TeamGame.findAll({
    include: [
      {
        model: Season,
        where: { year: { [Op.eq]: seasonYear } },
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'lag',
      },
      {
        model: Team,
        attributes: ['name', 'teamId', 'casualName', 'shortName'],
        as: 'opp',
      },
    ],
    order: [
      ['group', 'ASC'],
      ['date', 'ASC'],
    ],
  })
  if (!teamgames || teamgames.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No games',
      logging: false,
      context: { origin: 'GET Games Season Router' },
    })
  }
  res.status(200).json(teamgames)
}) as RequestHandler)

export default teamgameRouter
