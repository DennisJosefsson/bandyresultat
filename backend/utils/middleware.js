const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

const errorHandler = (error, req, res, next) => {
  console.log(
    `${new Date()}: ${error.name} - ${error.message} ---> ${error.stack
      .split('\n')
      .pop()}`
  )

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
