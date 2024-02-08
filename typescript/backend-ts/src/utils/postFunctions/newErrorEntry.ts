import BadRequestError from '../middleware/errors/BadRequestError.js'
import { errorAttributes, ErrorAttributes } from '../../models/BandyError.js'

const newErrorEntry = (object: unknown): ErrorAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewErrorEntry' },
    })
  }

  const errorEntry = errorAttributes.parse(object)

  return errorEntry
}

export default newErrorEntry
