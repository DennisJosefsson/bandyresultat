import {
  SeasonAttributes,
  seasonAttributes,
  SeasonInput,
  seasonInput,
} from '../../models/Season.js'

import BadRequestError from '../middleware/errors/BadRequestError.js'

export const updateSeasonEntry = (object: unknown): SeasonAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'UpdateSeasonEntry' },
    })
  }

  const updateSeason = seasonAttributes.parse(object)

  return updateSeason
}

const newSeasonEntry = (object: unknown): SeasonInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewSeasonEntry' },
    })
  }

  const newSeason = seasonInput.parse(object)

  return newSeason
}

export default newSeasonEntry
