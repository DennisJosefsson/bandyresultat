import {
  TeamGameAttributes,
  teamGameAttributes,
} from '../../models/TeamGame.js'
import { GameAttributes } from '../../models/Game.js'
import BadRequestError from '../middleware/errors/BadRequestError.js'
import { parseNumber } from './parsers.js'

export const newTeamGameHomeEntry = (
  object: GameAttributes,
  currChamp: number | null
): TeamGameAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTeamGameHomeEntry' },
    })
  }

  let teamGameEntry = {
    gameId: object.gameId,
    seasonId: object.seasonId,
    serieId: object.serieId,
    date: object.date,
    category: object.category,
    group: object.group,
    team: object.homeTeamId,
    opponent: object.awayTeamId,
    qualificationGame: object.category === 'qualification' ? true : false,
    homeGame: true,
    women: false,
    mix: false,
    goalsScored: 0,
    goalsConceded: 0,
    goalDifference: 0,
    points: 0,
    played: false,
    win: false,
    draw: false,
    lost: false,
    currInoffChamp: false,
  }

  if ('women' in object && typeof object['women'] === 'boolean') {
    teamGameEntry = { ...teamGameEntry, women: object.women }
  }

  if ('mix' in object && typeof object['mix'] === 'boolean') {
    teamGameEntry = { ...teamGameEntry, mix: object.mix }
  }

  if (
    'homeGoal' in object &&
    'awayGoal' in object &&
    object['homeGoal'] !== null &&
    object['awayGoal'] !== null
  ) {
    const goalsScored = parseNumber(object.homeGoal)
    const goalsConceded = parseNumber(object.awayGoal)
    const goalDifference = goalsScored - goalsConceded
    teamGameEntry = {
      ...teamGameEntry,
      goalsScored,
      goalsConceded,
      goalDifference,
      played: true,
    }

    if (goalsScored > goalsConceded) {
      teamGameEntry = {
        ...teamGameEntry,
        points: 2,
        win: true,
        currInoffChamp: object.awayTeamId === currChamp ? true : false,
      }
    } else if (goalsScored < goalsConceded) {
      teamGameEntry = {
        ...teamGameEntry,
        points: 0,
        lost: true,
      }
    } else {
      teamGameEntry = {
        ...teamGameEntry,
        points: 1,
        draw: true,
      }
    }
  }

  const newTeamGameEntry = teamGameAttributes.parse(teamGameEntry)

  return newTeamGameEntry
}

export const newTeamGameAwayEntry = (
  object: GameAttributes,
  currChamp: number | null
): TeamGameAttributes => {
  if (!object || typeof object !== 'object') {
    throw new BadRequestError({
      code: 400,
      message: 'Incorrect or missing data',
      logging: true,
      context: { origin: 'NewTeamGameAwayEntry' },
    })
  }

  let teamGameEntry = {
    gameId: object.gameId,
    seasonId: object.seasonId,
    serieId: object.serieId,
    date: object.date,
    category: object.category,
    group: object.group,
    team: object.awayTeamId,
    opponent: object.homeTeamId,
    qualificationGame: object.category === 'qualification' ? true : false,
    homeGame: false,
    women: false,
    mix: false,
    goalsScored: 0,
    goalsConceded: 0,
    goalDifference: 0,
    points: 0,
    played: false,
    win: false,
    draw: false,
    lost: false,
    currInoffChamp: false,
  }

  if ('women' in object && typeof object['women'] === 'boolean') {
    teamGameEntry = { ...teamGameEntry, women: object.women }
  }

  if ('mix' in object && typeof object['mix'] === 'boolean') {
    teamGameEntry = { ...teamGameEntry, mix: object.mix }
  }

  if (
    'homeGoal' in object &&
    'awayGoal' in object &&
    object['homeGoal'] !== null &&
    object['awayGoal'] !== null
  ) {
    const goalsScored = parseNumber(object.awayGoal)
    const goalsConceded = parseNumber(object.homeGoal)
    const goalDifference = goalsScored - goalsConceded
    teamGameEntry = {
      ...teamGameEntry,
      goalsScored,
      goalsConceded,
      goalDifference,
      played: true,
    }

    if (goalsScored > goalsConceded) {
      teamGameEntry = {
        ...teamGameEntry,
        points: 2,
        win: true,
        currInoffChamp: object.homeTeamId === currChamp ? true : false,
      }
    } else if (goalsScored < goalsConceded) {
      teamGameEntry = {
        ...teamGameEntry,
        points: 0,
        lost: true,
      }
    } else {
      teamGameEntry = {
        ...teamGameEntry,
        points: 1,
        draw: true,
      }
    }
  }

  const newTeamGameEntry = teamGameAttributes.parse(teamGameEntry)

  return newTeamGameEntry
}
