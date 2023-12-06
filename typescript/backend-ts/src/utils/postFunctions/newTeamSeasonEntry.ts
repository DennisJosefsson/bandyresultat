import { TeamSeasonInput } from '../../models/TeamSeason.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'
import { parseBool, parseNumber, parseTableId } from './parsers.js'

const newTeamSeasonEntry = (object: unknown): TeamSeasonInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTeamSeasonEntry' },
    })
  }

  if (
    'teamId' in object &&
    'seasonId' in object &&
    'women' in object &&
    'qualification' in object
  ) {
    const newEntry: TeamSeasonInput = {
      teamId: parseNumber(object.teamId),
      seasonId: parseNumber(object.seasonId),
      women: parseBool(object.women),
      qualification: parseBool(object.qualification),
      tableId: parseTableId(object),
    }

    return newEntry
  }
  throw new BadRequestError({
    code: 400,
    message: 'Missing field in TeamSeason Entry',
    logging: true,
    context: { origin: 'NewTeamSeasonEntry' },
  })
}

export default newTeamSeasonEntry
