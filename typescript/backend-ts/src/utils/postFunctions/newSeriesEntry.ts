import { SerieAttributes, serieAttributes } from '../../models/Serie.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

const newSeriesEntry = (object: unknown): SerieAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewSeriesEntry' },
    })
  }

  const newSerie = serieAttributes.parse(object)

  return newSerie
}

export default newSeriesEntry
