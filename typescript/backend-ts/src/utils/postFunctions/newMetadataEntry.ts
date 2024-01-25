import {
  MetadataAttributes,
  metadataAttributes,
  MetadataInput,
  metadataInput,
} from '../../models/Metadata.js'

import BadRequestError from '../middleware/errors/BadRequestError.js'

export const updateMetadataEntry = (object: unknown): MetadataAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'Update Metadata Entry' },
    })
  }

  const metadataEntry = metadataAttributes.parse(object)

  return metadataEntry
}

const newMetadataEntry = (object: unknown): MetadataInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'New Metadata Entry' },
    })
  }

  const metadataEntry = metadataInput.parse(object)

  return metadataEntry
}

export default newMetadataEntry
