import { SeasonInput } from '../../models/Season.js'
import { parseWomen, parseString, parseOptionalString } from './parsers.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

const newSeasonEntry = (object: unknown): SeasonInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewSeasonEntry' },
    })
  }

  if ('year' in object && 'women' in object) {
    const newSeason: SeasonInput = {
      year: parseString(object.year),
      women: parseWomen(object),
      seasonStructure: parseOptionalString(object),
    }

    return newSeason
  }

  throw new BadRequestError({
    code: 400,
    message: 'Missing fields',
    logging: true,
    context: { origin: 'NewSeasonEntry' },
  })
}

export default newSeasonEntry
