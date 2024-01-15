import {
  MetadataAttributes,
  metadataAttributes,
} from '../../models/Metadata.js'

import BadRequestError from '../middleware/errors/BadRequestError.js'

const newMetadataEntry = (object: unknown): MetadataAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'New Metadata Entry' },
    })
  }

  const metadataEntry = metadataAttributes.parse(object)

  return metadataEntry
}

export default newMetadataEntry
