type TeamId = number
import BadRequestError from '../middleware/errors/BadRequestError.js'

const teamIdCheck = (value: unknown): TeamId => {
  if (!value) {
    throw new BadRequestError({
      code: 400,
      message: 'Missing teamId value',
      logging: true,
      context: { origin: 'TeamId check' },
    })
  }
  const num = Number(value)
  if (!isNaN(num)) {
    return num
  }
  throw new BadRequestError({
    code: 400,
    message: 'Wrong teamId value',
    logging: true,
    context: { origin: 'TeamId check' },
  })
}

export default teamIdCheck
