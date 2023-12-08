import { TeamGameInput } from '../../models/TeamGame.js'
import { GameInput } from '../../models/Game.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'
import { parseDate, parseNumber, parseString, parseBool } from './parsers.js'

export const newTeamGameHomeEntry = (
  object: GameInput,
  currChamp: number | null
): TeamGameInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTeamGameHomeEntry' },
    })
  }

  if (
    'gameId' in object &&
    'homeTeamId' in object &&
    'awayTeamId' in object &&
    'date' in object &&
    'group' in object &&
    'category' in object &&
    'serieId' in object &&
    'seasonId' in object
  ) {
    let newTeamGameEntry: TeamGameInput = {
      gameId: parseNumber(object.gameId),
      team: parseNumber(object.homeTeamId),
      opponent: parseNumber(object.awayTeamId),
      date: parseDate(object.date),
      group: parseString(object.group),
      category: parseString(object.category),
      serieId: parseNumber(object.serieId),
      seasonId: parseNumber(object.seasonId),
      homeGame: true,
    }
    const qualificationGame = object.category === 'qualification' ? true : false
    if ('women' in object)
      newTeamGameEntry = { ...newTeamGameEntry, women: parseBool(object.women) }
    if ('mix' in object)
      newTeamGameEntry = { ...newTeamGameEntry, mix: parseBool(object.mix) }

    if (
      !('played' in object) ||
      ('played' in object && object.played === false)
    ) {
      return (newTeamGameEntry = {
        ...newTeamGameEntry,
        qualificationGame,
        goalsScored: 0,
        goalsConceded: 0,
        goalDifference: 0,
        points: 0,
        played: false,
      })
    }

    if ('homeGoal' in object && 'awayGoal' in object) {
      const homeGoal = parseNumber(object.homeGoal)
      const awayGoal = parseNumber(object.awayGoal)
      newTeamGameEntry = {
        ...newTeamGameEntry,
        goalsScored: homeGoal,
        goalsConceded: awayGoal,
        goalDifference: homeGoal - awayGoal,
        played: true,
        qualificationGame,
      }
      if (homeGoal > awayGoal) {
        newTeamGameEntry = {
          ...newTeamGameEntry,
          points: 2,
          win: true,
          currInoffChamp: object.awayTeamId === currChamp ? true : false,
        }
      } else if (homeGoal < awayGoal) {
        newTeamGameEntry = {
          ...newTeamGameEntry,
          points: 0,
          lost: true,
        }
      } else {
        newTeamGameEntry = {
          ...newTeamGameEntry,
          points: 1,
          draw: true,
        }
      }
    }

    return newTeamGameEntry
  }

  throw new BadRequestError({
    code: 400,
    message: 'Missing fields',
    logging: true,
    context: { origin: 'NewTeamGameHomeEntry' },
  })
}

export const newTeamGameAwayEntry = (
  object: GameInput,
  currChamp: number | null
): TeamGameInput => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTeamGameAwayEntry' },
    })
  }

  if (
    'gameId' in object &&
    'homeTeamId' in object &&
    'awayTeamId' in object &&
    'date' in object &&
    'group' in object &&
    'category' in object &&
    'serieId' in object &&
    'seasonId' in object
  ) {
    let newTeamGameEntry: TeamGameInput = {
      gameId: parseNumber(object.gameId),
      team: parseNumber(object.awayTeamId),
      opponent: parseNumber(object.homeTeamId),
      date: parseDate(object.date),
      group: parseString(object.group),
      category: parseString(object.category),
      serieId: parseNumber(object.serieId),
      seasonId: parseNumber(object.seasonId),
      homeGame: false,
    }
    const qualificationGame = object.category === 'qualification' ? true : false
    if ('women' in object)
      newTeamGameEntry = { ...newTeamGameEntry, women: parseBool(object.women) }
    if ('mix' in object)
      newTeamGameEntry = { ...newTeamGameEntry, mix: parseBool(object.mix) }

    if (
      !('played' in object) ||
      ('played' in object && object.played === false)
    ) {
      return (newTeamGameEntry = {
        ...newTeamGameEntry,
        qualificationGame,
        goalsScored: 0,
        goalsConceded: 0,
        goalDifference: 0,
        points: 0,
        played: false,
      })
    }

    if ('homeGoal' in object && 'awayGoal' in object) {
      const homeGoal = parseNumber(object.homeGoal)
      const awayGoal = parseNumber(object.awayGoal)
      newTeamGameEntry = {
        ...newTeamGameEntry,
        goalsScored: awayGoal,
        goalsConceded: homeGoal,
        goalDifference: awayGoal - homeGoal,
        played: true,
        qualificationGame,
      }
      if (homeGoal < awayGoal) {
        newTeamGameEntry = {
          ...newTeamGameEntry,
          points: 2,
          win: true,
          currInoffChamp: object.homeTeamId === currChamp ? true : false,
        }
      } else if (homeGoal > awayGoal) {
        newTeamGameEntry = {
          ...newTeamGameEntry,
          points: 0,
          lost: true,
        }
      } else {
        newTeamGameEntry = {
          ...newTeamGameEntry,
          points: 1,
          draw: true,
        }
      }
    }

    return newTeamGameEntry
  }

  throw new BadRequestError({
    code: 400,
    message: 'Missing fields',
    logging: true,
    context: { origin: 'NewTeamGameAwayEntry' },
  })
}
