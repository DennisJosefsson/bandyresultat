import { MetadataInput } from '../../models/Metadata.js'
import { parseNumber, parseString, parseBool } from './parsers.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

const newMetadataEntry = (object: unknown): MetadataInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'New Metadata Entry' },
    })
  }

  if (
    'seasonId' in object &&
    'year' in object &&
    'name' in object &&
    'hostCity' in object &&
    'finalDate' in object &&
    'northSouth' in object &&
    'multipleGroupStages' in object &&
    'eight' in object &&
    'quarter' in object &&
    'semi' in object &&
    'final' in object
  ) {
    let metadataEntry: MetadataInput = {
      seasonId: parseNumber(object.seasonId),
      year: parseString(object.year),
      name: parseString(object.name),
      hostCity: parseString(object.hostCity),
      finalDate: parseString(object.finalDate),
      northSouth: parseBool(object.northSouth),
      multipleGroupStages: parseBool(object.multipleGroupStages),
      eight: parseBool(object.eight),
      quarter: parseBool(object.quarter),
      semi: parseBool(object.semi),
      final: parseBool(object.final),
    }

    if ('comment' in object)
      metadataEntry = { ...metadataEntry, comment: parseString(object.comment) }
    if ('winnerName' in object)
      metadataEntry = {
        ...metadataEntry,
        winnerName: parseString(object.winnerName),
      }
    if ('winnerId' in object)
      metadataEntry = {
        ...metadataEntry,
        winnerId: parseNumber(object.winnerId),
      }
    if ('metadataId' in object)
      metadataEntry = {
        ...metadataEntry,
        metadataId: parseNumber(object.metadataId),
      }
    return metadataEntry
  }
  throw new BadRequestError({
    code: 400,
    message: 'Incorrect or missing data',
    logging: true,
    context: { origin: 'New Metadata Entry' },
  })
}

export default newMetadataEntry
