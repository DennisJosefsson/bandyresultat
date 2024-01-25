import {
  TeamAttributes,
  teamAttributes,
  TeamInput,
  teamInput,
} from '../../models/Team.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

export const updateTeamEntry = (object: unknown): TeamAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'UpdateTeamEntry' },
    })
  }

  const updateTeam = teamAttributes.parse(object)
  return updateTeam
}

const newTeamEntry = (object: unknown): TeamInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTeamEntry' },
    })
  }

  const newTeam = teamInput.parse(object)

  return newTeam
}

export default newTeamEntry
