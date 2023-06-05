const errorHandler = (error, req, res, next) => {
  console.log(error)

  next(error)
}

module.exports = { errorHandler }
