import { TeamAttributes, teamAttributes } from '../../models/Team.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

const newTeamEntry = (object: unknown): TeamAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTeamEntry' },
    })
  }

  const newTeam = teamAttributes.parse(object)

  return newTeam
}

export default newTeamEntry
