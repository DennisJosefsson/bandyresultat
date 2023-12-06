import { Request, Response, NextFunction } from 'express'
import { CustomError } from './CustomError.js'

export const errorHandler = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof CustomError) {
    const { statusCode, errors, logging } = error
    if (logging) {
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

    return res.status(statusCode).json({ errors })
  }

  console.error(JSON.stringify(error, null, 2))
  return res.status(500).json({ errors: [{ message: 'Something went wrong' }] })
}
