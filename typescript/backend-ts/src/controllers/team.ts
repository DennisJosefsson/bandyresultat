import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Team from '../models/Team.js'
import newTeamEntry from '../utils/postFunctions/newTeamEntry.js'

const teamRouter = Router()

teamRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const teams = await Team.findAll()
    if (!teams) {
      res.status(404).json({ message: 'No teams' })
    }
    res.status(200).json(teams)
  } catch (error) {
    console.log(error)
  }
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
