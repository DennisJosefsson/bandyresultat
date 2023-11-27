import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import Team from '../models/Team.js'

const teamRouter = Router()

teamRouter.get('/', (async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const teams = await Team.findAll()
  return res.json(teams)
}) as RequestHandler)

export default teamRouter
