import { teamSeasonAttributes } from '../../models/TeamSeason.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

// import { z } from 'zod'

// const teamSeasonPost = z.array(teamSeasonAttributes)

const teamSeasonUpsertPromise = (object: unknown) => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'teamSeasonUpsertPromise' },
    })
  }

  const teamSeasonEntries = teamSeasonAttributes.parse(object)

  return teamSeasonEntries
}

export default teamSeasonUpsertPromise
