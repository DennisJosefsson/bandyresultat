import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Team from '../models/Team.js'
import newTeamEntry, {
  updateTeamEntry,
} from '../utils/postFunctions/newTeamEntry.js'
import IDCheck from '../utils/postFunctions/IDCheck.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'
const teamRouter = Router()

teamRouter.get('/:teamId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamId = IDCheck.parse(req.params.teamId)
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
  const teams = await Team.findAll({
    order: [['teamId', 'asc']],
  })
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
  const [newTeam] = await Team.upsert(newTeamObject)
  return res.status(201).json(newTeam)
}) as RequestHandler)

teamRouter.put('/', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const updateTeamObject = updateTeamEntry(req.body)
  const team = await Team.findByPk(updateTeamObject.teamId)
  if (!team) {
    throw new NotFoundError({
      code: 404,
      message: 'No such team',
      logging: true,
      context: { origin: 'Update Team Router' },
    })
  }
  const entry = {
    teamId: updateTeamObject.teamId,
    name: updateTeamObject.name ? updateTeamObject.name : team.name,
    shortName: updateTeamObject.shortName
      ? updateTeamObject.shortName
      : team.shortName,
    casualName: updateTeamObject.casualName
      ? updateTeamObject.casualName
      : team.casualName,
    women: updateTeamObject.women ? updateTeamObject.women : team.women,
    city: updateTeamObject.city ? updateTeamObject.city : team.city,
    lat: updateTeamObject.lat ? updateTeamObject.lat : team.lat,
    long: updateTeamObject.long ? updateTeamObject.long : team.long,
  }
  const [updateTeam] = await Team.upsert(entry)
  return res.status(201).json(updateTeam)
}) as RequestHandler)

teamRouter.delete('/:seasonId', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teamId = IDCheck.parse(req.params.teamId)
  const team = await Team.findByPk(teamId)
  if (!team) {
    throw new NotFoundError({
      code: 404,
      message: 'No team',
      logging: false,
      context: { origin: 'Delete team Router' },
    })
  } else {
    await team.destroy()
    res.status(200).json({ message: 'team deleted' })
  }
}) as RequestHandler)

export default teamRouter
