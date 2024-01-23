import { z } from 'zod'
import { TeamAttributes, teamAttributes } from '../../models/Team.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

const updateEntry = z.object({
  teamId: z.number(),
  name: z.string().optional(),
  casualName: z.string().optional(),
  shortName: z.string().optional(),
  women: z.boolean().optional(),
  city: z.string().optional(),
  lat: z.number().optional(),
  long: z.number().optional(),
})

type UpdateEntry = z.infer<typeof updateEntry>

export const updateTeamEntry = (object: unknown): UpdateEntry => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'UpdateTeamEntry' },
    })
  }

  const updateTeam = updateEntry.parse(object)
  return updateTeam
}

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
