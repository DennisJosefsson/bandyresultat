import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import { sequelize } from '../../utils/db.js'
import Team from '../../models/Team.js'
import TeamSeason from '../../models/TeamSeason.js'
import newTeamEntry, {
  updateTeamEntry,
} from '../../utils/postFunctions/newTeamEntry.js'
import IDCheck from '../../utils/postFunctions/IDCheck.js'
import NotFoundError from '../../utils/middleware/errors/NotFoundError.js'
import authControl from '../../utils/middleware/authControl.js'
const teamRouter = Router()

teamRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teams = await Team.findAll({
    order: [[sequelize.literal(`casual_name collate "se-SE-x-icu"`), 'ASC']],
  })
  if (!teams || teams.length === 0) {
    throw new NotFoundError({
      code: 404,
      message: 'No teams',
      logging: false,
      context: { origin: 'Get All Teams Router' },
    })
  }
  res.status(200).json(teams)
}) as RequestHandler)

teamRouter.get('/latest', (async (_req, res, _next) => {
  res.locals.origin = 'GET Latest Season router'
  const women = false
  const teams = await TeamSeason.findAll({
    where: {
      seasonId: [
        sequelize.literal(
          `SELECT MAX("season_id") FROM "teamseasons" WHERE "women" = $women`
        ),
      ],
    },
    bind: { women },
  })

  res.status(200).json(teams)
}) as RequestHandler)

teamRouter.post('/', authControl, (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const newTeamObject = newTeamEntry(req.body)
  const [newTeam] = await Team.upsert(newTeamObject)
  return res.status(201).json(newTeam)
}) as RequestHandler)

teamRouter.put('/', authControl, (async (
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
      logging: false,
      context: { origin: 'Update Team Router' },
    })
  }

  const [updateTeam] = await Team.upsert(updateTeamObject)
  return res.status(201).json(updateTeam)
}) as RequestHandler)

teamRouter.delete('/:seasonId', authControl, (async (
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
