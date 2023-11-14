const { Error } = require('../models')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const errorHandler = async (error, req, res, next) => {
  console.log(' ')
  console.log('-------------- ERROR --------------')
  console.log(`${new Date()}`)
  console.log(`${error.name} - ${error.message}`)
  console.log('From', res.locals.origin)
  console.log('req.body', req.body)
  console.log('-------------- ERROR --------------')
  console.log(' ')
  await Error.create({
    name: error.name,
    message: error.message,
    origin: res.locals.origin,
    body: JSON.stringify(req.body),
    production: process.env.NODE_ENV === 'development' ? false : true,
    date: new Date().toString(),
    backend: true,
  })
  if (error.message === 'Unauthorized') {
    res.status(403).json({ error: 'Unauthorized' })
  }

  if (
    error.name === 'JsonWebTokenError' &&
    error.message === 'jwt must be provided'
  ) {
    res.status(403).json({ error: 'Unauthorized' })
  }
  next(error)
}

const authControl = (req, res, next) => {
  try {
    const token = req.cookies.bandykaka

    const decodedToken = jwt.verify(token, jwtSecret)

    if (!decodedToken.admin) {
      throw new Error({ message: 'Unauthorized' })
    }
    console.log('authorized')
    next()
  } catch (error) {
    next(error)
  }
}

const APIRestrictMiddleware = (req, res, next) => {
  if (req.headers['authorization'] === 'true') {
    next()
  } else {
    res.status(403).json({ error: true, message: 'Unauthorized' })
  }
}

module.exports = { errorHandler, authControl, APIRestrictMiddleware }
