import {
  TeamSeasonAttributes,
  teamSeasonAttributes,
} from '../../models/TeamSeason.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

const newTeamSeasonEntry = (object: unknown): TeamSeasonAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTeamSeasonEntry' },
    })
  }

  const teamSeasonEntry = teamSeasonAttributes.parse(object)

  return teamSeasonEntry
}

export default newTeamSeasonEntry
