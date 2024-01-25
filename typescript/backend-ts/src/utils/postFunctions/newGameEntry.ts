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

  if ('result' in object && typeof object['result'] === 'string') {
    homeGoal = object.result.split('-')[0]
    awayGoal = object.result.split('-')[1]
    played = true
  }

  if (
    'halftimeResult' in object &&
    typeof object['halftimeResult'] === 'string'
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

  // if (
  //   'seasonId' in object &&
  //   'homeTeamId' in object &&
  //   'awayTeamId' in object &&
  //   'date' in object &&
  //   'category' in object &&
  //   'group' in object &&
  //   serieId
  // ) {
  //   const teamIds = parseGameTeamIds(object)
  //   let gameEntry: GameAttributes = {
  //     seasonId: parseNumber(object.seasonId),
  //     serieId: parseNumber(serieId),
  //     homeTeamId: parseNumber(teamIds.homeTeamId),
  //     awayTeamId: parseNumber(teamIds.awayTeamId),
  //     group: parseString(object.group),
  //     category: parseString(object.category),
  //     date: parseDate(object.date),
  //   }

  //   if ('result' in object) {
  //     const resultObject = parseResult(object, 'fulltime')
  //     if (resultObject)
  //       gameEntry = {
  //         ...gameEntry,
  //         result: resultObject.result,
  //         homeGoal: resultObject.homeGoal,
  //         awayGoal: resultObject.awayGoal,
  //         played: true,
  //       }
  //   }

  //   if ('halftimeResult' in object) {
  //     const resultObject = parseResult(object, 'halftime')
  //     if (resultObject)
  //       gameEntry = {
  //         ...gameEntry,
  //         halftimeResult: resultObject.result,
  //         halftimeHomeGoal: resultObject.homeGoal,
  //         halftimeAwayGoal: resultObject.awayGoal,
  //       }
  //   }

  //   if ('playoff' in object)
  //     gameEntry = { ...gameEntry, playoff: parseBool(object.playoff) }
  //   if ('mix' in object)
  //     gameEntry = { ...gameEntry, mix: parseBool(object.mix) }
  //   if ('penalties' in object)
  //     gameEntry = { ...gameEntry, penalties: parseBool(object.penalties) }
  //   if ('extraTime' in object)
  //     gameEntry = { ...gameEntry, extraTime: parseBool(object.extraTime) }
  //   if ('women' in object)
  //     gameEntry = { ...gameEntry, women: parseBool(object.women) }
  //   if ('played' in object)
  //     gameEntry = { ...gameEntry, played: parseBool(object.played) }
  //   if ('gameId' in object)
  //     gameEntry = { ...gameEntry, gameId: parseNumber(object.gameId) }

  //   return gameEntry
  // }

  // throw new BadRequestError({
  //   code: 400,
  //   message: 'Missing fields',
  //   logging: true,
  //   context: { origin: 'NewGameEntry' },
  // })
}

export const simpleGameData = z.object({
  women: z.boolean(),
  group: z.string(),
  seasonId: z.number(),
})

export default newGameEntry
