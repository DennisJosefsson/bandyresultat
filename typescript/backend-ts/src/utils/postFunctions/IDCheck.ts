type ID = number
import BadRequestError from '../middleware/errors/BadRequestError.js'

const IDCheck = (value: unknown): ID => {
  if (!value) {
    throw new BadRequestError({
      code: 400,
      message: 'Missing ID value',
      logging: true,
      context: { origin: 'ID check' },
    })
  }
  const num = Number(value)
  if (!isNaN(num)) {
    return num
  }
  throw new BadRequestError({
    code: 400,
    message: 'Wrong ID value',
    logging: true,
    context: { origin: 'ID check' },
  })
}

export default IDCheck
