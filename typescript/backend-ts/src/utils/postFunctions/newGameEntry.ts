import { GameInput } from '../../models/Game.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'
import {
  parseDate,
  parseNumber,
  parseResult,
  parseString,
  parseBool,
  parseGameTeamIds,
} from './parsers.js'

type IntroGameData = {
  women: boolean
  seasonId: number
  group: string
}

const newGameEntry = (object: unknown, serieId: number): GameInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewGameEntry' },
    })
  }

  if (
    'seasonId' in object &&
    'homeTeamId' in object &&
    'awayTeamId' in object &&
    'date' in object &&
    'category' in object &&
    'group' in object &&
    serieId
  ) {
    const teamIds = parseGameTeamIds(object)
    let gameEntry: GameInput = {
      seasonId: parseNumber(object.seasonId),
      serieId: parseNumber(serieId),
      homeTeamId: parseNumber(teamIds.homeTeamId),
      awayTeamId: parseNumber(teamIds.awayTeamId),
      group: parseString(object.group),
      category: parseString(object.category),
      date: parseDate(object.date),
    }

    if ('result' in object) {
      const resultObject = parseResult(object, 'fulltime')
      if (resultObject)
        gameEntry = {
          ...gameEntry,
          result: resultObject.result,
          homeGoal: resultObject.homeGoal,
          awayGoal: resultObject.awayGoal,
          played: true,
        }
    }

    if ('halftimeResult' in object) {
      const resultObject = parseResult(object, 'halftime')
      if (resultObject)
        gameEntry = {
          ...gameEntry,
          halftimeResult: resultObject.result,
          halftimeHomeGoal: resultObject.homeGoal,
          halftimeAwayGoal: resultObject.awayGoal,
        }
    }

    if ('playoff' in object)
      gameEntry = { ...gameEntry, playoff: parseBool(object.playoff) }
    if ('mix' in object)
      gameEntry = { ...gameEntry, mix: parseBool(object.mix) }
    if ('penalties' in object)
      gameEntry = { ...gameEntry, penalties: parseBool(object.penalties) }
    if ('extraTime' in object)
      gameEntry = { ...gameEntry, extraTime: parseBool(object.extraTime) }
    if ('women' in object)
      gameEntry = { ...gameEntry, women: parseBool(object.women) }
    if ('played' in object)
      gameEntry = { ...gameEntry, played: parseBool(object.played) }
    if ('gameId' in object)
      gameEntry = { ...gameEntry, gameId: parseNumber(object.gameId) }

    return gameEntry
  }

  throw new BadRequestError({
    code: 400,
    message: 'Missing fields',
    logging: true,
    context: { origin: 'NewGameEntry' },
  })
}

export const simpleGameData = (object: unknown): IntroGameData => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'IntroGameData' },
    })
  }

  if ('women' in object && 'group' in object && 'seasonId' in object) {
    return {
      women: parseBool(object.women),
      group: parseString(object.group),
      seasonId: parseNumber(object.seasonId),
    }
  }

  throw new BadRequestError({
    code: 400,
    message: 'Missing fields',
    logging: true,
    context: { origin: 'IntroGameData' },
  })
}

export default newGameEntry
