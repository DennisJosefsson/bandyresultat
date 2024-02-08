import {
  teamTableInput,
  teamTableAttributes,
  TeamTableInput,
  TeamTableAttributes,
} from '../../models/TeamTable.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

export const updateTableEntry = (object: unknown): TeamTableAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'updateTableEntry' },
    })
  }

  const updateTable = teamTableAttributes.parse(object)
  return updateTable
}

const newTableEntry = (object: unknown): TeamTableInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTableEntry' },
    })
  }

  const newTable = teamTableInput.parse(object)

  return newTable
}

export default newTableEntry
