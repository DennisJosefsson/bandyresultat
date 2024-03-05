import { z } from 'zod'
import { GameAttributes, gameAttributes } from '../../models/Game.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'

const newGameEntry = (object: unknown, serieId: number): GameAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewGameEntry' },
    })
  }

  let homeGoal = undefined
  let awayGoal = undefined
  let played = false
  let halftimeHomeGoal = undefined
  let halftimeAwayGoal = undefined

  if (
    'result' in object &&
    typeof object['result'] === 'string' &&
    object['result'] !== ''
  ) {
    homeGoal = object.result.split('-')[0]
    awayGoal = object.result.split('-')[1]
    played = true
  }

  if (
    'halftimeResult' in object &&
    typeof object['halftimeResult'] === 'string' &&
    object['halftimeResult'] !== ''
  ) {
    halftimeHomeGoal = object.halftimeResult.split('-')[0]
    halftimeAwayGoal = object.halftimeResult.split('-')[1]
  }

  const newGameObject = {
    ...object,
    serieId,
    homeGoal,
    awayGoal,
    halftimeAwayGoal,
    halftimeHomeGoal,
    played,
  }
  const gameEntry = gameAttributes.parse(newGameObject)

  return gameEntry
}

export const simpleGameData = z.object({
  women: z.boolean(),
  group: z.string(),
  seasonId: z.number(),
})

export default newGameEntry
