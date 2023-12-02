import { TeamInput } from '../../models/Team.js'
import { parseString, parseLatLong, parseWomen } from './parsers.js'

const newTeamEntry = (object: unknown): TeamInput => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
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

  throw new Error('Incorrect data: some fields are missing')
}

export default newTeamEntry
