import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Team from '../models/Team.js'
import newTeamEntry from '../utils/postFunctions/newTeamEntry.js'
import teamIdCheck from '../utils/postFunctions/teamIdCheck.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
const teamRouter = Router()

teamRouter.get('/:id', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamId = teamIdCheck(req.params.id)
  const team = await Team.findByPk(teamId)
  if (!team) {
    throw new NotFoundError({
      code: 404,
      message: 'No such team',
      logging: true,
      context: { origin: 'GET Single Team Router' },
    })
  }
  res.status(200).json(team)
}) as RequestHandler)

teamRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teams = await Team.findAll()
  if (!teams || teams.length === 0) {
    throw new Error('No teams')
  }
  res.status(200).json(teams)
}) as RequestHandler)

teamRouter.post('/', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const newTeamObject = newTeamEntry(req.body)
  const newTeam = await Team.create(newTeamObject)
  return res.json(newTeam)
}) as RequestHandler)

export default teamRouter
