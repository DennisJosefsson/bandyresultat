import { TeamInput } from '../../models/Team.js'
import { parseString, parseLatLong, parseWomen } from './parsers.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

const newTeamEntry = (object: unknown): TeamInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTeamEntry' },
    })
  }

  if (
    'name' in object &&
    'casualName' in object &&
    'shortName' in object &&
    'city' in object
  ) {
    const newTeam: TeamInput = {
      name: parseString(object.name),
      shortName: parseString(object.shortName),
      casualName: parseString(object.casualName),
      city: parseString(object.city),
      lat: parseLatLong(object, 'lat'),
      long: parseLatLong(object, 'long'),
      women: parseWomen(object),
    }

    return newTeam
  }

  throw new BadRequestError({
    code: 400,
    message: 'Missing fields',
    logging: true,
    context: { origin: 'NewTeamEntry' },
  })
}

export default newTeamEntry
