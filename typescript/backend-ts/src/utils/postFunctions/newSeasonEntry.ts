import { SeasonInput } from '../../models/Season.js'
import {
  parseWomen,
  parseString,
  parseStringedSeasonstructure,
} from './parsers.js'

const newSeasonEntry = (object: unknown): SeasonInput => {
  console.log('object at newSeasonEntry', object)
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data')
  }

  if ('year' in object && 'women' in object) {
    const newSeason: SeasonInput = {
      year: parseString(object.year),
      women: parseWomen(object),
      seasonStructure: parseStringedSeasonstructure(object),
    }

    return newSeason
  }

  throw new Error('Incorrect data: some fields are missing')
}

export default newSeasonEntry
