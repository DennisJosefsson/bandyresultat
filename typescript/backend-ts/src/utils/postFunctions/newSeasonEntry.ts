import { SeasonAttributes, seasonAttributes } from '../../models/Season.js'

import BadRequestError from '../middleware/errors/BadRequestError.js'

const newSeasonEntry = (object: unknown): SeasonAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewSeasonEntry' },
    })
  }

  const newSeason = seasonAttributes.parse(object)

  return newSeason
}

export default newSeasonEntry
