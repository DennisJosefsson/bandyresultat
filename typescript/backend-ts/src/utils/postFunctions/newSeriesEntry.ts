import { SerieInput } from '../../models/Serie.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'
import {
  parseNumber,
  parseOptionalString,
  parseSerieComment,
  parseSerieStructure,
  parseString,
} from './parsers.js'

const newSeriesEntry = (object: unknown): SerieInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewSeriesEntry' },
    })
  }

  if (
    'serieGroupCode' in object &&
    'serieCategory' in object &&
    'serieName' in object &&
    'seasonId' in object
  ) {
    const newSerie: SerieInput = {
      seasonId: parseNumber(object.seasonId),
      serieName: parseString(object.serieName),
      serieGroupCode: parseString(object.serieGroupCode),
      serieCategory: parseString(object.serieCategory),
      comment: parseSerieComment(object),
      serieStructure: parseSerieStructure(object),
      bonusPoints: parseOptionalString(object),
    }

    return newSerie
  }

  throw new BadRequestError({
    code: 400,
    message: 'Missing fields',
    logging: true,
    context: { origin: 'NewSeriesEntry' },
  })
}

export default newSeriesEntry
