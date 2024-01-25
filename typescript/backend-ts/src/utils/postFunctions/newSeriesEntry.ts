import {
  SerieAttributes,
  serieAttributes,
  SerieInput,
  serieInput,
} from '../../models/Serie.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

export const updateSeriesEntry = (object: unknown): SerieAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'UpdateSeriesEntry' },
    })
  }

  const updateSerie = serieAttributes.parse(object)

  return updateSerie
}

const newSeriesEntry = (object: unknown): SerieInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewSeriesEntry' },
    })
  }

  const newSerie = serieInput.parse(object)

  return newSerie
}

export default newSeriesEntry
