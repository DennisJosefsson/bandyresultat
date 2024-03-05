import { Request, Response, NextFunction } from 'express'
import { CustomError } from './CustomError.js'
import { ZodError } from 'zod'
import jsonwebtoken from 'jsonwebtoken'
import BandyError from '../../../models/BandyError.js'
const { JsonWebTokenError } = jsonwebtoken

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    const { statusCode, logging } = error
    if (logging) {
      BandyError.create({
        name: error.name,
        message: error.message,
        origin: res.locals.origin as string,
        body: JSON.stringify(req.body),
        production: process.env.NODE_ENV === 'development' ? false : true,
        date: new Date().toString(),
        backend: true,
      })
        .then(() => {
          next()
        })
        .catch(next)
      console.error(
        JSON.stringify(
          {
            code: error.statusCode,
            errors: error.errors,
            stack: error.stack,
          },
          null,
          2
        )
      )
    }

    return res.status(statusCode).json({ errors: error.message })
  } else if (error instanceof ZodError) {
    BandyError.create({
      name: error.name,
      message: error.message,
      origin: res.locals.origin as string,
      body: JSON.stringify(req.body),
      production: process.env.NODE_ENV === 'development' ? false : true,
      date: new Date().toString(),
      backend: true,
    })
      .then(() => {
        next()
      })
      .catch(next)
    const errorStrings = error.issues.map((error) => error.message)
    const errorString = errorStrings.join(', ')
    console.error(JSON.stringify(error.errors, null, 2))
    return res.status(400).json({ errors: errorString })
  } else if (error instanceof JsonWebTokenError) {
    BandyError.create({
      name: error.name,
      message: error.message,
      origin: res.locals.origin as string,
      body: JSON.stringify(req.body),
      production: process.env.NODE_ENV === 'development' ? false : true,
      date: new Date().toString(),
      backend: true,
    })
      .then(() => {
        next()
      })
      .catch(next)
    console.error(JSON.stringify(error.message, null, 2))
    return res.status(401).json({ errors: error.message })
  } else if (
    error instanceof Error &&
    error.name === 'SequelizeDatabaseError' &&
    error.message.includes('date/time field value out of range')
  ) {
    BandyError.create({
      name: error.name,
      message: error.message,
      origin: res.locals.origin as string,
      body: JSON.stringify(req.body),
      production: process.env.NODE_ENV === 'development' ? false : true,
      date: new Date().toString(),
      backend: true,
    })
      .then(() => {
        next()
      })
      .catch(next)
    console.error(JSON.stringify(error, null, 2))
    return res.status(400).json({ message: error.message })
  }
  BandyError.create({
    name: error.name,
    message: error.message,
    origin: res.locals.origin as string,
    body: JSON.stringify(req.body),
    production: process.env.NODE_ENV === 'development' ? false : true,
    date: new Date().toString(),
    backend: true,
  })
    .then(() => {
      next()
    })
    .catch(next)
  console.error(JSON.stringify(error, null, 2))
  return res.status(500).json({ errors: [{ message: 'Något gick fel' }] })
}
