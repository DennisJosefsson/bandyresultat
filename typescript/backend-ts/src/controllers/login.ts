import dotenv from 'dotenv'
dotenv.config()
import {
  Router,
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express'
import User, { userFromLoginForm } from '../models/User.js'
import { compare } from 'bcrypt-ts'
import jwt, { Secret } from 'jsonwebtoken'
import { z } from 'zod'
import dayjs from 'dayjs'
import LoginError from '../utils/middleware/errors/LoginError.js'
import NotFoundError from '../utils/middleware/errors/NotFoundError.js'

const checkString = z.string()

const secret: Secret = checkString.parse(process.env.JWT_SECRET)

const loginRouter = Router()

loginRouter.get('/logout', ((
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'GET Logout router'

  console.log('loggar ut')
  res.clearCookie('bandykaka')
  res.status(200).json({ success: true, message: 'Tillbakakaka' })
}) as RequestHandler)

loginRouter.post('/', (async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  res.locals.origin = 'POST login router'
  const userData = userFromLoginForm.parse(req.body)
  const user = await User.findOne({ where: { userName: userData.userName } })
  if (!user) {
    throw new NotFoundError({
      code: 404,
      message: 'Fel användarnamn.',
      logging: false,
      context: { origin: 'Login Router' },
    })
  } else {
    const authenticated = await compare(userData.password, user.password)
    if (authenticated) {
      const userForToken = { userName: user.userName, admin: user.admin }
      const token = jwt.sign(userForToken, secret)

      res.cookie('bandykaka', token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
        expires: dayjs().add(1, 'days').toDate(),
      })

      res.status(200).json({ success: true, message: 'Logged in' })
    } else {
      throw new LoginError({
        code: 401,
        message: 'Fel lösenord.',
        logging: false,
        context: { origin: 'Login Router' },
      })
    }
  }
}) as RequestHandler)

export default loginRouter
