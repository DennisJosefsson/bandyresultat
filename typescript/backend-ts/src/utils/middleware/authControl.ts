import dotenv from 'dotenv'
dotenv.config()
import { z } from 'zod'
import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { userForAdmin } from '../../models/User.js'
import LoginError from './errors/LoginError.js'

const checkString = z.string()

const secret: Secret = checkString.parse(process.env.JWT_SECRET)

const authControl = (req: Request, _res: Response, next: NextFunction) => {
  try {
    if (!req.cookies.bandykaka) {
      throw new LoginError({
        code: 401,
        message: 'No cookie',
        logging: false,
        context: { origin: 'Authcontrol' },
      })
    }
    const token = req.cookies.bandykaka as string

    if (!secret) {
      throw new LoginError({
        code: 401,
        message: 'Missing auth config',
        logging: false,
        context: { origin: 'Authcontrol' },
      })
    }

    const decodedToken = jwt.verify(token, secret)

    const decoded = userForAdmin.parse(decodedToken)

    if (!decoded.admin) {
      throw new LoginError({
        code: 401,
        message: 'Unauthorized',
        logging: false,
        context: { origin: 'Authcontrol' },
      })
    }
    console.log('authorized')
    next()
  } catch (error) {
    next(error)
  }
}

export default authControl
